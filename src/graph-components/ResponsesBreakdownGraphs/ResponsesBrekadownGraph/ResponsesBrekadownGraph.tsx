'use client'

import { LegacyDashboardName } from '@enums'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from 'recharts'
import { classNames, niceNum, toThousandsSep } from '@utils'
import { useTranslation } from '@app/i18n/client'
import { useFilterFormsStore } from '@stores/filter-forms'
import React, { MutableRefObject, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { IResponsesBreakdownData } from '@interfaces'
import { UseFormReturn } from 'react-hook-form'
import { TFilter } from '@schemas/filter'
import { ParamsContext } from '@contexts/params'

interface IResponsesBreakdownGraphProps {
    data: IResponsesBreakdownData[]
    type: 'parent' | 'sub' | 'parent_or_sub'
    title: string
    filtersAreIdentical: boolean
    filter1Description: string
    filter2Description: string
}

interface ICustomTooltip extends TooltipProps<number, string> {
    dashboard: string
    hoveredBarDataKey: MutableRefObject<string>
    showTooltip: boolean
    lang: string
}

export const ResponsesBreakdownGraph = ({
    data,
    type,
    title,
    filtersAreIdentical,
    filter1Description,
    filter2Description,
}: IResponsesBreakdownGraphProps) => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang } = params

    const [responsesBreakdown, setResponsesBreakdown] = useState<IResponsesBreakdownData[]>(data)
    const form1 = useFilterFormsStore((state) => state.form1)
    const form2 = useFilterFormsStore((state) => state.form2)
    const hoveredBarDataKey = useRef<string>(undefined as any)
    const [showTooltip, setShowTooltip] = useState<boolean>(false)
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

    // Set height
    let height: number
    if (dashboard === LegacyDashboardName.HEALTHWELLBEING && type !== 'parent') {
        height = 950
    } else {
        switch (dashboard) {
            case LegacyDashboardName.ALL_CAMPAIGNS:
                height = 1950
                break
            default:
                height = 625
        }
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
            bar1Classes = 'fill-dataExchangeColors-primary hover:fill-dataExchangeColors-secondary'
            bar2Classes = 'fill-dataExchangeColors-quaternary hover:fill-dataExchangeColors-quaternaryFaint'
            break
        default:
            bar1Classes = 'fill-defaultColors-primary hover:fill-defaultColors-primaryFaint'
            bar2Classes = 'fill-defaultColors-tertiary hover:fill-defaultColors-tertiaryFaint'
    }

    // Format x-axis numbers
    function xAxisFormatter(item: number) {
        return toThousandsSep(Math.abs(item), lang).toString()
    }

    // Determine the max value for the x-axis
    const getMaxValueX = useMemo(() => {
        if (responsesBreakdown.length < 1) return 0

        // Find the max value for count_1
        const count1Max = Math.abs(
            responsesBreakdown.reduce((prev, curr) => (prev.count_1 > curr.count_1 ? prev : curr)).count_1
        )

        // Find the max value for count_2 (count_2 has negative numbers) and convert the number to positive
        const count2Max = Math.abs(
            responsesBreakdown.reduce((prev, curr) => (prev.count_2 < curr.count_2 ? prev : curr)).count_2
        )

        return niceNum(Math.max(count1Max, count2Max), false)
    }, [responsesBreakdown])

    // Domain for x-axis
    const xAxisDomain = useMemo(() => {
        if (filtersAreIdentical) {
            return [0, getMaxValueX]
        } else {
            return [-getMaxValueX, getMaxValueX]
        }
    }, [filtersAreIdentical, getMaxValueX])

    // Set responses breakdown
    useEffect(() => {
        // Set count 2 values as negative
        const tmpModifiedResponsesBreakdown: IResponsesBreakdownData[] = []
        for (const datum of data) {
            const tmpDatum = datum
            tmpDatum.count_2 = -Math.abs(tmpDatum.count_2)
            tmpModifiedResponsesBreakdown.push(tmpDatum)
        }

        setResponsesBreakdown(tmpModifiedResponsesBreakdown)
    }, [data])

    // Set form value
    function setFormValue(payload: any, form: UseFormReturn<TFilter>) {
        const data = payload?.payload as IResponsesBreakdownData
        if (data?.value) {
            const currentValues = form.getValues('response_topics')
            if (!currentValues.includes(data.value)) {
                form.setValue('response_topics', [...currentValues, data.value])
            }
        }
    }

    // Legend formatter
    function legendFormatter(value: string) {
        if (data) {
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
        }

        return null
    }

    // Toggle showTooltip
    function toggleShowTooltip() {
        setShowTooltip((prev) => !prev)
    }

    // Set hovered bar data key
    function setHoveredBarDataKey(dataKey: string) {
        hoveredBarDataKey.current = dataKey
    }

    return (
        <div>
            {/* Graph */}
            <div className="mb-3 flex flex-col">
                {/* Title */}
                <div className="mt-3 text-lg font-bold">{title}</div>

                {/* Bar chart */}
                <div className="mb-3 mt-3 w-full">
                    <ResponsiveContainer height={height} className="bg-white">
                        <BarChart
                            data={responsesBreakdown}
                            margin={{ top: 15, right: 50, left: 10, bottom: 15 }}
                            width={750}
                            layout="vertical"
                            barCategoryGap={5}
                            stackOffset="sign"
                        >
                            {/* Only display the legend if filters are not identical */}
                            {!filtersAreIdentical && (
                                <Legend
                                    verticalAlign="top"
                                    formatter={(value) => legendFormatter(value)}
                                    wrapperStyle={{ paddingBottom: '1rem' }}
                                />
                            )}
                            <XAxis
                                type="number"
                                axisLine={false}
                                domain={xAxisDomain}
                                tickFormatter={(item) => xAxisFormatter(item)}
                            />
                            <YAxis
                                dataKey="label"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                width={450}
                                interval={0}
                            />
                            <CartesianGrid strokeDasharray="0" stroke="#FFFFFF" />
                            <RechartsTooltip
                                cursor={{ fill: 'transparent' }}
                                content={
                                    <CustomTooltip
                                        dashboard={dashboard}
                                        hoveredBarDataKey={hoveredBarDataKey}
                                        showTooltip={showTooltip}
                                        lang={lang}
                                    />
                                }
                                position={{ x: 25 }}
                            />

                            {/* Only display bar2 if filters are not identical */}
                            {!filtersAreIdentical && (
                                <Bar
                                    dataKey="count_2"
                                    className={classNames('hover:cursor-pointer', bar2Classes)}
                                    fill={bar2Fill}
                                    minPointSize={2}
                                    onClick={(payload) => {
                                        if (form2) setFormValue(payload, form2)
                                    }}
                                    stackId={0}
                                    onMouseOver={() => setHoveredBarDataKey('count_2')}
                                    onMouseEnter={toggleShowTooltip}
                                    onMouseLeave={toggleShowTooltip}
                                />
                            )}
                            <Bar
                                dataKey="count_1"
                                className={classNames('hover:cursor-pointer', bar1Classes)}
                                fill={bar1Fill}
                                minPointSize={2}
                                onClick={(payload) => {
                                    if (form1) setFormValue(payload, form1)
                                }}
                                stackId={0}
                                onMouseOver={() => setHoveredBarDataKey('count_1')}
                                onMouseEnter={toggleShowTooltip}
                                onMouseLeave={toggleShowTooltip}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

const CustomTooltip = ({ active, payload, label, hoveredBarDataKey, showTooltip, lang }: ICustomTooltip) => {
    if (active && payload && payload.length) {
        const data = payload.find((data) => data.dataKey === hoveredBarDataKey.current)
        if (data) {
            const value = data.value ? Math.abs(data.value) : 0

            return (
                <p
                    className={classNames(`border border-white p-1 text-sm text-white`, showTooltip ? '' : 'hidden')}
                    style={{ backgroundColor: data.color }}
                >
                    {`${label}, ${toThousandsSep(value, lang)}`}
                </p>
            )
        }
    }

    return null
}
