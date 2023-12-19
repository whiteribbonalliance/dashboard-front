'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { useCampaignQuery } from '@hooks/use-campaign-query'
import { GraphError } from '@components/GraphError'
import { Loading } from 'components/Loading'
import React, { useContext } from 'react'
import { Cell, Legend, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts'
import { classNames, toThousandsSep } from '@utils'
import { useTranslation } from '@app/i18n/client'
import _ from 'lodash'
import { LegacyDashboardName } from '@enums'
import { UseFormReturn } from 'react-hook-form'
import { TFilter } from '@schemas/filter'
import { useFilterFormsStore } from '@stores/filter-forms'
import { IGenderBreakdown } from '@interfaces'
import { ParamsContext } from '@contexts/params'

interface ICustomTooltip extends TooltipProps<number, string> {
    lang: string
}

// 9 unique colors
// If there are more than 9 genders, include more colors
const defaultColors = _.shuffle([
    'var(--defaultPrimaryFaint)',
    'var(--defaultPrimary)',
    'var(--defaultPrimaryLessFaint)',
    'var(--defaultSecondary)',
    'var(--defaultSecondaryFaint)',
    'var(--defaultSecondaryLessFaint)',
    'var(--defaultTertiary)',
    'var(--defaultTertiaryDark)',
    'var(--defaultQuaternary)',
])

// 10 unique colors
// If there are more than 10 genders, include more colors
const whatYoungPeopleWantColors = _.shuffle([
    'var(--pmnchPrimary)',
    'var(--pmnchSecondary)',
    'var(--pmnchSecondaryFaint)',
    'var(--pmnchQuaternary)',
    'var(--pmnchTertiary)',
    'var(--pmnchTertiaryFaint)',
    'var(--pmnchQuinary)',
    'var(--pmnchSenary)',
    'var(--pmnchSeptenary)',
    'var(--pmnchSeptenaryFaint)',
])

export const GenderBreakdownGraph = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang } = params

    const { data, isError, isLoading, isRefetching } = useCampaignQuery()
    const form1 = useFilterFormsStore((state) => state.form1)
    const { t } = useTranslation(lang)

    // Set colors
    let colors: string[]
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            colors = whatYoungPeopleWantColors
            break
        default:
            colors = defaultColors
    }

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
            const radius = 175 + (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5
            const x = (cx as number) + radius * Math.cos(-midAngle * radian)
            const y = (cy as number) + radius * Math.sin(-midAngle * radian)

            // Set font size
            let fontSize = 15
            if (percent * 100 < 10) {
                fontSize = 12
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

    // Set form value
    function setFormValue(form: UseFormReturn<TFilter>, payload: any) {
        const data = payload?.payload as IGenderBreakdown
        if (data?.value) {
            const currentFormValues = form.getValues('genders')
            if (!currentFormValues.includes(data.value)) {
                form.setValue('genders', [...currentFormValues, data.value])
            }
        }
    }

    const displayGraph = !!data && !isLoading && !isRefetching

    // Nothing to show
    if (data && data?.genders_breakdown?.length) {
        return null
    }

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text={t('gender-breakdown')} />

            {/* Error */}
            {!data && isError && <GraphError dashboard={dashboard} />}

            {/* Loading */}
            {!displayGraph && !isError && <Loading dashboard={dashboard} />}

            {/* Graph */}
            {displayGraph && (
                <div className="mb-3 mt-3 w-full">
                    <ResponsiveContainer height={650} className="bg-white">
                        <PieChart width={730} height={650} margin={{ top: 15, right: 10, left: 10, bottom: 15 }}>
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
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                outerRadius={220}
                                minAngle={1.8}
                                onClick={(payload) => {
                                    if (form1) setFormValue(form1, payload)
                                }}
                            >
                                {data.genders_breakdown.map((datum, index) => (
                                    <Cell key={`cell-${datum.label}`} fill={colors[index % colors.length]} />
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
