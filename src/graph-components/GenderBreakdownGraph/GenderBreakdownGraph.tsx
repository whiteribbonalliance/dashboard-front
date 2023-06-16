'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { useCampaignQuery } from '@hooks/use-campaign'
import { GraphError } from '@components/GraphError'
import { GraphLoading } from '@components/GraphLoading'
import React from 'react'
import { Cell, Legend, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts'
import { classNames } from '@utils'
import { useTranslation } from '@app/i18n/client'

interface IGenderBreakdownGraphProps {
    dashboard: string
    lang: string
}

interface ICustomTooltip extends TooltipProps<number, string> {}

const colors = [
    'var(--pmnchPrimary)',
    'var(--pmnchSecondary)',
    'var(--pmnchTertiary)',
    'var(--pmnchQuaternary)',
    'var(--pmnchQuinary)',
    'var(--pmnchSenary)',
    'var(--pmnchSeptenary)',
]

export const GenderBreakdownGraph = ({ dashboard, lang }: IGenderBreakdownGraphProps) => {
    const { data, isError } = useCampaignQuery(dashboard, lang)
    const { t } = useTranslation(lang)

    // Legend formatter
    function legendFormatter(value: string) {
        return <span className="text-black">{value}</span>
    }

    // Custom label
    function customLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) {
        if (cx !== undefined && innerRadius !== undefined && outerRadius !== undefined && midAngle !== undefined) {
            const radian = Math.PI / 180
            const radius = 120 + (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5
            const x = (cx as number) + radius * Math.cos(-midAngle * radian)
            const y = (cy as number) + radius * Math.sin(-midAngle * radian)

            return (
                <text
                    x={x}
                    y={y}
                    fill="black"
                    textAnchor={x > (cx as number) ? 'start' : 'end'}
                    dominantBaseline="central"
                >
                    {`${((percent as number) * 100).toFixed(2)}%`}
                </text>
            )
        }

        return null
    }

    // Display graph or not
    const displayGraph = !!data

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text={t('gender-breakdown')} />

            {/* Error */}
            {!data && isError && <GraphError dashboard={dashboard} />}

            {/* Loading (only at first data fetch) */}
            {!displayGraph && !isError && <GraphLoading dashboard={dashboard} />}

            {/* Graph */}
            {displayGraph && (
                <div className="mb-3 mt-3 w-full">
                    <ResponsiveContainer height={550} className="bg-white">
                        <PieChart width={730} height={300} margin={{ top: 15, right: 10, left: 10, bottom: 15 }}>
                            <Legend
                                verticalAlign="top"
                                wrapperStyle={{ paddingBottom: '1rem' }}
                                formatter={legendFormatter}
                            />
                            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                            <Pie
                                data={data.genders_breakdown}
                                label={customLabel}
                                dataKey="count"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={170}
                                minAngle={20}
                            >
                                {data.genders_breakdown.map((datum, index) => (
                                    <Cell key={`cell-${datum.name}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Box>
    )
}

const CustomTooltip = ({ active, payload }: ICustomTooltip) => {
    if (active && payload && payload.length) {
        const data = payload[0]
        if (data) {
            const name = data.name
            const value = data.value

            return (
                <p
                    className={classNames(`border border-white p-1 text-sm text-black shadow-md`)}
                    style={{ backgroundColor: 'var(--white)' }}
                >
                    {`${name}, ${value}`}
                </p>
            )
        }
    }

    return null
}
