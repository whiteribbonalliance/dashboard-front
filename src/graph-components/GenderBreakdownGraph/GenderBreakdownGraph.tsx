'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { useCampaignQuery } from '@hooks/use-campaign'
import { GraphError } from '@components/GraphError'
import { GraphLoading } from '@components/GraphLoading'
import React from 'react'
import { Cell, Legend, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts'
import { classNames, toThousandsSep } from '@utils'
import { useTranslation } from '@app/i18n/client'
import { Dashboard } from '@types'

interface IGenderBreakdownGraphProps {
    dashboard: Dashboard
    lang: string
}

interface ICustomTooltip extends TooltipProps<number, string> {
    lang: string
}

const colors = [
    'var(--pmnchQuaternary)',
    'var(--pmnchSecondaryFaint)',
    'var(--pmnchTertiary)',
    'var(--pmnchTertiaryFaint)',
    'var(--pmnchQuinary)',
    'var(--pmnchQuinaryFaint)',
    'var(--pmnchSenary)',
    'var(--pmnchPrimary)',
    'var(--pmnchSeptenary)',
    'var(--pmnchSecondary)',
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
        if (
            cx !== undefined &&
            cy !== undefined &&
            midAngle !== undefined &&
            innerRadius !== undefined &&
            outerRadius !== undefined &&
            percent !== undefined
        ) {
            const radian = Math.PI / 180
            const radius = 135 + (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5
            const x = (cx as number) + radius * Math.cos(-midAngle * radian)
            const y = (cy as number) + radius * Math.sin(-midAngle * radian)

            // Set font size
            let fontSize = 15
            if (percent * 100 < 10) {
                fontSize = 10
            }

            return (
                <text
                    fontSize={fontSize}
                    x={x}
                    y={y}
                    fill="black"
                    textAnchor={x > (cx as number) ? 'start' : 'end'}
                    dominantBaseline="central"
                >
                    {`${((percent as number) * 100).toFixed(3)}%`}
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
                            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip lang={lang} />} />
                            <Pie
                                data={data.genders_breakdown}
                                label={customLabel}
                                dataKey="count"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={165}
                                minAngle={2.1}
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

const CustomTooltip = ({ active, payload, lang }: ICustomTooltip) => {
    if (active && payload && payload.length) {
        const data = payload[0]
        if (data) {
            const name = data.name
            const value = data.value as number

            return (
                <p
                    className={classNames(`border border-white p-1 text-sm text-black shadow-md`)}
                    style={{ backgroundColor: 'var(--white)' }}
                >
                    {`${name}, ${toThousandsSep(value, lang)}`}
                </p>
            )
        }
    }

    return null
}
