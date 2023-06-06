'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { GraphError } from '@components/GraphError'
import { GraphLoading } from '@components/GraphLoading'
import { useCampaignQuery } from '@hooks/use-campaign'
import { SelectSingleValue } from '@components/SelectSingleValue'
import { Option } from '@types'
import { Controller, useForm } from 'react-hook-form'
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { ThePeopleBreakdown, thePeopleBreakdownSchema } from '@schemas/the-people-breakdown'
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
import { classNames, niceNum } from '@utils'
import { IHistogramData } from '@interfaces'

interface IWhoThePeopleAreGraphProps {
    dashboard: string
}

interface ICustomTooltip extends TooltipProps<number, string> {
    dashboard: string
    hoveredBarDataKey: MutableRefObject<string>
    showTooltip: boolean
}

const options: Option[] = [
    { value: 'breakdown-age', label: 'Show breakdown by age' },
    { value: 'breakdown-country-or-region', label: 'Show breakdown by country or region' },
]

export const WhoThePeopleAreGraph = ({ dashboard }: IWhoThePeopleAreGraphProps) => {
    const { data, isError } = useCampaignQuery(dashboard)
    const [dataModified, setDataModified] = useState<IHistogramData[]>([])
    const hoveredBarDataKey = useRef<string>(undefined as any)
    const [showTooltip, setShowTooltip] = useState<boolean>(false)

    let filtersDescriptionsAreEqual = false
    if (data) {
        filtersDescriptionsAreEqual = data.filter_1_description === data.filter_2_description
    }

    const filter = useForm<ThePeopleBreakdown>({
        defaultValues: { show_breakdown_by: 'breakdown-age' },
        resolver: zodResolver(thePeopleBreakdownSchema),
    })

    // Set bars fill
    let bar1Fill: string
    let bar2Fill: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            bar1Fill = 'var(--pmnchPrimary)'
            bar2Fill = 'var(--pmnchSecondary)'
            break
        default:
            bar1Fill = 'var(--defaultTertiary)'
            bar2Fill = 'var(--defaultSecondary)'
    }

    // Modify data by setting count 2 values as negative
    useEffect(() => {
        if (data) {
            for (const datum of data.histogram.age) {
                datum.count_2 = -datum.count_2
            }
            setDataModified(data.histogram.age)
        }
    }, [data])

    // Display breakdown
    function displayBreakdown() {
        console.log(filter.getValues().show_breakdown_by)
    }

    // Return all numbers as positive
    function xAxisFormatter(item: number) {
        return Math.abs(item).toString()
    }

    // Determine the max value for the x-axis
    const getMaxValueX = useMemo(() => {
        if (dataModified.length < 1) return 0

        // Find the max value for count_1
        const count1Max = Math.abs(
            dataModified.reduce((prev, curr) => (prev.count_1 > curr.count_1 ? prev : curr)).count_1
        )

        // Find the lowest value for count_2 (count_2 has negative numbers) and convert the number to positive
        const count2Max = Math.abs(
            dataModified.reduce((prev, curr) => (prev.count_2 < curr.count_2 ? prev : curr)).count_2
        )

        return niceNum(Math.max(count1Max, count2Max), true)
    }, [dataModified])

    // Legend formatter
    function legendFormatter(value: string) {
        if (data) {
            if (value == 'count_1') {
                return <span className="text-black">{data.filter_1_description}</span>
            }
            if (value == 'count_2') {
                return <span className="text-black">{data.filter_2_description} (normalized)</span>
            }
        }

        return null
    }

    // Domain for x-axis
    const xAxisDomain = useMemo(() => {
        if (filtersDescriptionsAreEqual) {
            return [0, getMaxValueX]
        } else {
            return [-getMaxValueX, getMaxValueX]
        }
    }, [filtersDescriptionsAreEqual, getMaxValueX])

    // Set hovered bar data key
    function setHoveredBarDataKey(dataKey: string) {
        hoveredBarDataKey.current = dataKey
    }

    // Toggle showTooltip
    function toggleShowTooltip() {
        setShowTooltip((prev) => !prev)
    }

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Who the people are" />
            <p>Number and ages of respondents.</p>

            {/* Error */}
            {!data && isError && <GraphError dashboard={dashboard} />}

            {/* Loading (only at first data fetch) */}
            {!data && !isError && <GraphLoading dashboard={dashboard} />}

            {/* Graph */}
            {dataModified.length > 0 && (
                <div className="mt-3 flex flex-col">
                    {/* Select */}
                    <div className="w-full max-w-sm">
                        <Controller
                            name="show_breakdown_by"
                            control={filter.control}
                            render={({ field: { onChange, value } }) => (
                                <SelectSingleValue
                                    id="select-show-breakdown-by"
                                    options={options}
                                    value={value}
                                    controllerRenderOnChange={onChange}
                                    customOnChange={displayBreakdown}
                                />
                            )}
                        />
                    </div>

                    {/* Bar chart */}
                    <div className="mb-3 mt-3 w-full">
                        <ResponsiveContainer height={450} className="bg-white">
                            <BarChart
                                data={dataModified}
                                margin={{ top: 15, right: 35, left: 15, bottom: 15 }}
                                width={750}
                                height={450}
                                layout="vertical"
                                barCategoryGap={1}
                                stackOffset="sign"
                            >
                                <Legend formatter={(value) => legendFormatter(value)} />
                                <XAxis
                                    type="number"
                                    axisLine={false}
                                    domain={xAxisDomain}
                                    tickFormatter={(item) => xAxisFormatter(item)}
                                />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={150} />
                                <CartesianGrid strokeDasharray="0" stroke="#FFFFFF" />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    content={
                                        <CustomTooltip
                                            dashboard={dashboard}
                                            hoveredBarDataKey={hoveredBarDataKey}
                                            showTooltip={showTooltip}
                                        />
                                    }
                                    position={{ x: 25 }}
                                />

                                {/* Only display the legend if the filters descriptions are not the same */}
                                {!filtersDescriptionsAreEqual && <Legend />}

                                <Bar
                                    dataKey="count_1"
                                    stackId="a"
                                    fill={bar1Fill}
                                    onMouseOver={() => {
                                        setHoveredBarDataKey('count_1')
                                    }}
                                    onMouseEnter={toggleShowTooltip}
                                    onMouseLeave={toggleShowTooltip}
                                />

                                {!filtersDescriptionsAreEqual && (
                                    <Bar
                                        dataKey="count_2"
                                        stackId="a"
                                        fill={bar2Fill}
                                        onMouseOver={() => {
                                            setHoveredBarDataKey('count_2')
                                        }}
                                        onMouseEnter={toggleShowTooltip}
                                        onMouseLeave={toggleShowTooltip}
                                    />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </Box>
    )
}

const CustomTooltip = ({ active, payload, label, dashboard, hoveredBarDataKey, showTooltip }: ICustomTooltip) => {
    if (active && payload && payload.length) {
        const data = payload.find((data) => data.dataKey === hoveredBarDataKey.current)
        if (data) {
            const value = data.value ? Math.abs(data.value) : ''

            return (
                <p
                    className={classNames(`border border-white p-1 text-sm text-white`, showTooltip ? '' : 'hidden')}
                    style={{ backgroundColor: data.color }}
                >
                    {`${label}, ${value}`}
                </p>
            )
        }
    }

    return null
}
