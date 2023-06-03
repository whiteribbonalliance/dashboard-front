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

interface ITopWordsOrPhrasesProps {
    dashboard: string
    id: 'top-words' | 'two-word-phrases' | 'three-word-phrases'
    words: ITopWords[]
    filter1Description: string
    filter2Description: string
    yAxisWidth: number
}

interface ICustomTooltip extends TooltipProps<ValueType, NameType> {
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
    yAxisWidth,
}: ITopWordsOrPhrasesProps) => {
    const hoveredBarDataKey = useRef<string>(undefined as any)
    const filtersDescriptionsAreEqual = filter1Description === filter2Description

    // Set fill classes and custom tooltip paragraph classes (each id has a different color)
    let pmnchFillClasses: string
    let defaultFillClasses: string
    let pmnchCustomTooltipParagraphClasses: string
    let defaultCustomTooltipParagraphClasses: string
    switch (id) {
        case 'top-words':
            pmnchFillClasses = 'fill-pmnchColors-secondary hover:fill-pmnchColors-secondaryFaint'
            defaultFillClasses = 'fill-defaultColors-secondary hover:fill-defaultColors-secondaryFaint'
            pmnchCustomTooltipParagraphClasses = 'bg-pmnchColors-secondary'
            defaultCustomTooltipParagraphClasses = 'bg-defaultColors-secondary'
            break
        case 'two-word-phrases':
            pmnchFillClasses = 'fill-pmnchColors-tertiary hover:fill-pmnchColors-tertiaryFaint'
            defaultFillClasses = 'fill-defaultColors-tertiary hover:fill-defaultColors-tertiaryFaint'
            pmnchCustomTooltipParagraphClasses = 'bg-pmnchColors-tertiary'
            defaultCustomTooltipParagraphClasses = 'bg-defaultColors-tertiary'
            break
        case 'three-word-phrases':
            pmnchFillClasses = 'fill-pmnchColors-primary hover:fill-pmnchColors-primaryFaint'
            defaultFillClasses = 'fill-defaultColors-primary hover:fill-defaultColors-primaryFaint'
            pmnchCustomTooltipParagraphClasses = 'bg-pmnchColors-primary'
            defaultCustomTooltipParagraphClasses = 'bg-defaultColors-primary'
            break
        default:
            pmnchFillClasses = 'fill-pmnchColors-primary hover:fill-pmnchColors-primaryFaint'
            defaultFillClasses = 'fill-defaultColors-primary hover:fill-defaultColors-primaryFaint'
            pmnchCustomTooltipParagraphClasses = 'bg-pmnchColors-primary'
            defaultCustomTooltipParagraphClasses = 'bg-defaultColors-primary'
    }

    // Set bars classes
    let bar1Classes: string
    let bar2Classes: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            bar1Classes = `${pmnchFillClasses}`
            bar2Classes = 'fill-grayLight hover:fill-grayLighter'
            break
        default:
            bar1Classes = `${defaultFillClasses}`
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
            <div className="h-[42rem] w-full">
                <ResponsiveContainer className="bg-white">
                    <BarChart
                        data={words}
                        margin={{ top: 15, right: 35, left: 0, bottom: 15 }}
                        width={750}
                        layout="vertical"
                        barCategoryGap={2}
                        barGap={0}
                    >
                        {/* Only display the legend if the filters descriptions are not the same */}
                        {!filtersDescriptionsAreEqual && <Legend formatter={(value) => legendFormatter(value)} />}

                        <XAxis dataKey="count_1" type="number" axisLine={false} tickCount={7} />
                        <YAxis dataKey="word" type="category" axisLine={false} tickLine={false} width={yAxisWidth} />
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
                            onMouseOver={() => setHoveredBarDataKey('count_1')}
                        />

                        {/* Only display the second bar if the filters descriptions are not the same */}
                        {!filtersDescriptionsAreEqual && (
                            <Bar
                                dataKey="count_2"
                                className={bar2Classes}
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
