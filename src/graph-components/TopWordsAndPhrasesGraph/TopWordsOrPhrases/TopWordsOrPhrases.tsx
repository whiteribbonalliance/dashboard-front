'use client'

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from 'recharts'
import { LegacyDashboardName } from '@enums'
import { classNames, toThousandsSep } from '@utils'
import { MutableRefObject, useRef } from 'react'
import { ITopWord } from '@interfaces'
import { useTranslation } from '@app/i18n/client'
import { useFilterFormsStore } from '@stores/filter-forms'

interface ITopWordsOrPhrasesProps {
    dashboard: string
    lang: string
    words: ITopWord[]
    filter1Description: string
    filter2Description: string
    filtersAreIdentical: boolean
    yAxisWidth: number
}

interface ICustomTooltip extends TooltipProps<number, string> {
    hoveredBarDataKey: MutableRefObject<string>
    lang: string
}

export const TopWordsOrPhrases = ({
    dashboard,
    lang,
    words,
    filter1Description,
    filter2Description,
    filtersAreIdentical,
    yAxisWidth,
}: ITopWordsOrPhrasesProps) => {
    const hoveredBarDataKey = useRef<string>(undefined as any)
    const form1 = useFilterFormsStore((state) => state.form1)
    const form2 = useFilterFormsStore((state) => state.form2)
    const { t } = useTranslation(lang)

    // Set bars fill
    let bar1Fill: string
    let bar2Fill: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            bar1Fill = 'var(--pmnchSecondary)'
            bar2Fill = 'var(--pmnchTertiary)'
            break
        case LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE:
            bar1Fill = 'var(--dataExchangePrimary)'
            bar2Fill = 'var(--dataExchangeQuaternary)'
            break
        default:
            bar1Fill = 'var(--defaultPrimary)'
            bar2Fill = 'var(--defaultTertiary)'
    }

    // Set bars classes
    let bar1Classes: string
    let bar2Classes: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            bar1Classes = 'fill-pmnchColors-secondary hover:fill-pmnchColors-secondaryFaint'
            bar2Classes = 'fill-pmnchColors-tertiary hover:fill-pmnchColors-tertiaryFaint'
            break
        case LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE:
            bar1Classes = 'fill-dataExchangeColors-primary hover:fill-dataExchangeColors-primaryFaint'
            bar2Classes = 'fill-dataExchangeColors-quaternary hover:fill-dataExchangeColors-quaternaryFaint'
            break
        default:
            bar1Classes = 'fill-defaultColors-primary hover:fill-defaultColors-primaryFaint'
            bar2Classes = 'fill-defaultColors-tertiary hover:fill-defaultColors-tertiaryFaint'
    }

    // Legend formatter
    function legendFormatter(value: string) {
        if (value === 'count_1') {
            return <span className="text-black">{filter1Description}</span>
        }
        if (value === 'count_2') {
            return (
                <span className="text-black">
                    {filter2Description} ({t('normalized')})
                </span>
            )
        }

        return null
    }

    // Set hovered bar data key
    function setHoveredBarDataKey(dataKey: string) {
        hoveredBarDataKey.current = dataKey
    }

    // Set form value 1
    function setFormValue1(payload: any) {
        const data = payload?.payload as ITopWord
        if (data?.label && form1) {
            form1.setValue('keyword_filter', data.label)
        }
    }

    // Set form value 2
    function setFormValue2(payload: any) {
        const data = payload?.payload as ITopWord
        if (data?.label && form2) {
            form2.setValue('keyword_filter', data.label)
        }
    }

    return (
        <div className="mb-3 mt-3 w-full">
            <p className="mb-3 w-full">Click on a bar to view responses containing a word or phrase.</p>
            <div className="w-full">
                <ResponsiveContainer height={675} className="bg-white">
                    <BarChart
                        data={words}
                        margin={{ top: 15, right: 35, left: 0, bottom: 15 }}
                        width={750}
                        layout="vertical"
                        barCategoryGap={5}
                        barGap={0}
                    >
                        {/* Only display the legend if filters not identical */}
                        {!filtersAreIdentical && (
                            <Legend
                                formatter={(value) => legendFormatter(value)}
                                verticalAlign="top"
                                wrapperStyle={{ paddingBottom: '1rem' }}
                            />
                        )}

                        <XAxis dataKey="count_1" type="number" axisLine={false} tickCount={7} />
                        <YAxis
                            dataKey="label"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            width={yAxisWidth}
                            interval={0}
                        />
                        <CartesianGrid strokeDasharray="0" stroke="#FFFFFF" />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            content={<CustomTooltip hoveredBarDataKey={hoveredBarDataKey} lang={lang} />}
                            position={{ x: 25 }}
                        />
                        <Bar
                            dataKey="count_1"
                            className={classNames('hover:cursor-pointer', bar1Classes)}
                            fill={bar1Fill}
                            minPointSize={3}
                            onMouseOver={() => setHoveredBarDataKey('count_1')}
                            onClick={setFormValue1}
                        />

                        {/* Only display the second bar if filters are not identical */}
                        {!filtersAreIdentical && (
                            <Bar
                                dataKey="count_2"
                                className={classNames('hover:cursor-pointer', bar2Classes)}
                                fill={bar2Fill}
                                minPointSize={3}
                                onMouseOver={() => setHoveredBarDataKey('count_2')}
                                onClick={setFormValue2}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const CustomTooltip = ({ active, payload, label, hoveredBarDataKey, lang }: ICustomTooltip) => {
    const { t } = useTranslation(lang)

    if (active && payload && payload.length) {
        const data = payload.find((data) => data.dataKey === hoveredBarDataKey.current)
        if (data) {
            const value = data.value as number
            const color = data.color

            return (
                <p
                    key={color}
                    className={classNames('border border-white p-1 text-sm text-white')}
                    style={{ backgroundColor: color }}
                >
                    <span className="font-bold">{toThousandsSep(value, lang)}</span> {t('people-have-mentioned')}{' '}
                    <span className="font-bold">“{label}”</span>.
                </p>
            )
        }
    }

    return null
}
