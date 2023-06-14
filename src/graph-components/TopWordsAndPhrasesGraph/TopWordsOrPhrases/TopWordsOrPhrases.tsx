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
import { DashboardName } from '@enums'
import { classNames } from '@utils'
import { MutableRefObject, useRef } from 'react'
import { ITopWords } from '@interfaces'

interface ITopWordsOrPhrasesProps {
    dashboard: string
    id: 'top-words' | 'two-word-phrases' | 'three-word-phrases'
    words: ITopWords[]
    filter1Description: string
    filter2Description: string
    filtersAreIdentical: boolean
    yAxisWidth: number
}

interface ICustomTooltip extends TooltipProps<number, string> {
    dashboard: string
    hoveredBarDataKey: MutableRefObject<string>
    pmnchParagraphClasses: string
    defaultParagraphClasses: string
}

export const TopWordsOrPhrases = ({
    dashboard,
    id,
    words,
    filter1Description,
    filter2Description,
    filtersAreIdentical,
    yAxisWidth,
}: ITopWordsOrPhrasesProps) => {
    const hoveredBarDataKey = useRef<string>(undefined as any)

    // Set bars classes, bars fill, and custom tooltip paragraph classes (each id has a different color)
    let pmnchBar1Classes: string
    let defaultBar1Classes: string
    let pmnchBar1Fill: string
    let defaultBar1Fill: string
    let pmnchCustomTooltipParagraphClasses: string
    let defaultCustomTooltipParagraphClasses: string
    switch (id) {
        case 'top-words':
            pmnchBar1Classes = 'fill-pmnchColors-secondary hover:fill-pmnchColors-secondaryFaint'
            defaultBar1Classes = 'fill-defaultColors-secondary hover:fill-defaultColors-secondaryFaint'
            pmnchBar1Fill = 'var(--pmnchSecondary)'
            defaultBar1Fill = 'var(--defaultSecondary)'
            pmnchCustomTooltipParagraphClasses = 'bg-pmnchColors-secondary'
            defaultCustomTooltipParagraphClasses = 'bg-defaultColors-secondary'
            break
        case 'two-word-phrases':
            pmnchBar1Classes = 'fill-pmnchColors-tertiary hover:fill-pmnchColors-tertiaryFaint'
            defaultBar1Classes = 'fill-defaultColors-tertiary hover:fill-defaultColors-tertiaryFaint'
            pmnchBar1Fill = 'var(--pmnchTertiary)'
            defaultBar1Fill = 'var(--defaultTertiary)'
            pmnchCustomTooltipParagraphClasses = 'bg-pmnchColors-tertiary'
            defaultCustomTooltipParagraphClasses = 'bg-defaultColors-tertiary'
            break
        case 'three-word-phrases':
            pmnchBar1Classes = 'fill-pmnchColors-primary hover:fill-pmnchColors-primaryFaint'
            defaultBar1Classes = 'fill-defaultColors-primary hover:fill-defaultColors-primaryFaint'
            pmnchBar1Fill = 'var(--pmnchPrimary)'
            defaultBar1Fill = 'var(--defaultPrimary)'
            pmnchCustomTooltipParagraphClasses = 'bg-pmnchColors-primary'
            defaultCustomTooltipParagraphClasses = 'bg-defaultColors-primary'
            break
        default:
            pmnchBar1Classes = 'fill-pmnchColors-primary hover:fill-pmnchColors-primaryFaint'
            defaultBar1Classes = 'fill-defaultColors-primary hover:fill-defaultColors-primaryFaint'
            pmnchBar1Fill = 'var(--pmnchPrimary)'
            defaultBar1Fill = 'var(--defaultPrimary)'
            pmnchCustomTooltipParagraphClasses = 'bg-pmnchColors-primary'
            defaultCustomTooltipParagraphClasses = 'bg-defaultColors-primary'
    }

    // Set bars fill
    let bar1Fill: string
    let bar2Fill: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            bar1Fill = `${pmnchBar1Fill}`
            bar2Fill = 'var(--grayLight)'
            break
        default:
            bar1Fill = `${defaultBar1Fill}`
            bar2Fill = 'var(--grayLight)'
    }

    // Set bars classes
    let bar1Classes: string
    let bar2Classes: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            bar1Classes = `${pmnchBar1Classes}`
            bar2Classes = 'fill-grayLight hover:fill-grayLighter'
            break
        default:
            bar1Classes = `${defaultBar1Classes}`
            bar2Classes = 'fill-grayLight hover:fill-grayLighter'
    }

    // Legend formatter
    function legendFormatter(value: string) {
        if (value == 'count_1') {
            return <span className="text-black">{filter1Description}</span>
        }
        if (value == 'count_2') {
            return <span className="text-black">{filter2Description} (normalized)</span>
        }

        return null
    }

    // Set hovered bar data key
    function setHoveredBarDataKey(dataKey: string) {
        hoveredBarDataKey.current = dataKey
    }

    return (
        <div className="mt-3 w-full">
            <p className="mb-3 w-full">Click on a bar to view responses containing a word or phrase.</p>
            <div className="h-[43rem] w-full">
                <ResponsiveContainer className="bg-white">
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
                            dataKey="word"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            width={yAxisWidth}
                            interval={0}
                        />
                        <CartesianGrid strokeDasharray="0" stroke="#FFFFFF" />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            content={
                                <CustomTooltip
                                    dashboard={dashboard}
                                    hoveredBarDataKey={hoveredBarDataKey}
                                    pmnchParagraphClasses={pmnchCustomTooltipParagraphClasses}
                                    defaultParagraphClasses={defaultCustomTooltipParagraphClasses}
                                />
                            }
                            position={{ x: 25 }}
                        />
                        <Bar
                            dataKey="count_1"
                            className={bar1Classes}
                            fill={bar1Fill}
                            minPointSize={5}
                            onMouseOver={() => setHoveredBarDataKey('count_1')}
                        />

                        {/* Only display the second bar if filters are not identical */}
                        {!filtersAreIdentical && (
                            <Bar
                                dataKey="count_2"
                                className={bar2Classes}
                                fill={bar2Fill}
                                minPointSize={5}
                                onMouseOver={() => setHoveredBarDataKey('count_2')}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const CustomTooltip = ({
    active,
    payload,
    label,
    dashboard,
    hoveredBarDataKey,
    pmnchParagraphClasses,
    defaultParagraphClasses,
}: ICustomTooltip) => {
    // Set p classes
    let pClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            pClasses = pmnchParagraphClasses
            break
        default:
            pClasses = defaultParagraphClasses
    }

    if (active && payload && payload.length) {
        const data = payload.find((data) => data.dataKey === hoveredBarDataKey.current)
        if (data) {
            const value = data.value

            return (
                <p className={classNames(`border border-white p-1 text-sm text-white`, pClasses)}>
                    <span className="font-bold">{value}</span> people mentioned{' '}
                    <span className="font-bold">“{label}”</span>.
                </p>
            )
        }
    }

    return null
}
