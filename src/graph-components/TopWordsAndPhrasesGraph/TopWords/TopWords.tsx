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
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { MutableRefObject, useRef } from 'react'
import { ITopWords } from '@interfaces'

interface ITopWordsProps {
    dashboard: string
    topWords: ITopWords[]
    filter1Description: string
    filter2Description: string
}

interface ICustomTooltip extends TooltipProps<ValueType, NameType> {
    dashboard: string
    hoveredBarDataKey: MutableRefObject<string>
}

export const TopWords = ({ dashboard, topWords, filter1Description, filter2Description }: ITopWordsProps) => {
    const hoveredBarDataKey = useRef<string>(undefined as any)

    // Set bar fill colors
    let barFill1: string
    let barFill2: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            barFill1 = 'var(--pmnchSecondary)'
            barFill2 = 'var(--grayLight)'
            break
        default:
            barFill1 = 'var(--defaultSecondary)'
            barFill2 = 'var(--grayLight)'
    }

    // Set bar classes
    let barClasses1: string
    let barClasses2: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            barClasses1 = 'hover:fill-pmnchColors-secondaryFaint'
            barClasses2 = 'hover:fill-grayLighter'
            break
        default:
            barClasses1 = 'hover:fill-defaultColors-secondaryFaint'
            barClasses2 = 'hover:fill-grayLighter'
    }

    // Legend formatter
    function legendFormatter(value: string) {
        if (value == 'count_1') {
            return <span className="text-black">{filter1Description}</span>
        }
        if (value == 'count_2') {
            return <span className="text-black">{filter2Description}</span>
        }

        return null
    }

    // Set hovered bar data key
    function setHoveredBarDataKey(dataKey: string) {
        hoveredBarDataKey.current = dataKey
    }

    return (
        <div className="mt-3">
            <p className="mb-3">Click on a bar to view responses containing a word or phrase.</p>
            <div className="h-[40rem]">
                <ResponsiveContainer className="bg-white">
                    <BarChart
                        data={topWords}
                        margin={{ top: 15, right: 35, left: 15, bottom: 15 }}
                        layout="vertical"
                        barCategoryGap={2}
                        barGap={0}
                    >
                        {filter1Description != filter2Description && (
                            <Legend formatter={(value) => legendFormatter(value)} />
                        )}
                        <XAxis dataKey="count_1" type="number" axisLine={false} tickCount={7} />
                        <YAxis dataKey="word" type="category" axisLine={false} tickLine={false} />
                        <CartesianGrid strokeDasharray="0" stroke="#FFFFFF" />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            content={<CustomTooltip dashboard={dashboard} hoveredBarDataKey={hoveredBarDataKey} />}
                            position={{ x: 25 }}
                        />
                        <Bar
                            dataKey="count_1"
                            className={barClasses1}
                            fill={barFill1}
                            onMouseOver={() => setHoveredBarDataKey('count_1')}
                        />
                        <Bar
                            dataKey="count_2"
                            className={barClasses2}
                            fill={barFill2}
                            onMouseOver={() => setHoveredBarDataKey('count_2')}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const CustomTooltip = ({ active, payload, label, dashboard, hoveredBarDataKey }: ICustomTooltip) => {
    if (active && payload && payload.length) {
        const data = payload.find((data) => data.dataKey === hoveredBarDataKey.current)
        if (data) {
            // Set p classes
            let pClasses: string
            switch (dashboard) {
                case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
                    pClasses = 'bg-pmnchColors-secondary'
                    break
                default:
                    pClasses = 'bg-defaultColors-secondary'
            }

            return (
                <p className={classNames(`border border-white p-1 text-sm text-white`, pClasses)}>
                    <span className="font-bold">{data.value}</span> people mentioned{' '}
                    <span className="font-bold">“{label}”</span>.
                </p>
            )
        }
    }

    return null
}
