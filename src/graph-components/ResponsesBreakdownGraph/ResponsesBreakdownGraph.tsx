'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { DashboardName } from '@enums'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'
import { useCampaignQuery } from '@hooks/use-campaign'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { classNames } from '@utils'
import { GraphLoading } from 'components/GraphLoading'
import { GraphError } from 'components/GraphError'

interface IResponsesBreakdownGraphProps {
    dashboard: string
}

interface ICustomTooltip extends TooltipProps<ValueType, NameType> {
    dashboard: string
}

export const ResponsesBreakdownGraph = ({ dashboard }: IResponsesBreakdownGraphProps) => {
    const { data, isError } = useCampaignQuery(dashboard)

    // Set topic text
    let topicText: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            topicText = 'domain'
            break
        default:
            topicText = 'topic'
    }

    // Set respondents text
    let respondentsText: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            respondentsText = "women's"
            break
        default:
            respondentsText = "respondents'"
    }

    // Set respondents noun plural
    let respondentNounPlural: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            respondentNounPlural = whatWomenWantConfig.respondentsNounPlural
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            respondentNounPlural = whatYoungPeopleWantConfig.respondentsNounPlural
            break
        case DashboardName.MIDWIVES_VOICES:
            respondentNounPlural = midwivesVoicesConfig.respondentsNounPlural
            break
        default:
            respondentNounPlural = 'respondents'
    }

    // Set bar classes
    let barClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            barClasses = 'fill-pmnchColors-secondary hover:fill-pmnchColors-secondaryFaint'
            break
        default:
            barClasses = 'fill-defaultColors-secondary hover:fill-defaultColors-secondaryFaint'
    }

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text={`Breakdown of ${respondentsText} responses by ${topicText}`} />
            <p>
                Click on a topic to view responses. Some {respondentNounPlural} mentioned more than one topic. You can
                hover over the graph and select the zoom and pan options, or click and drag the graph up and down, to
                see more. Hover over a bar to see the numbers and full category name.
            </p>

            {/* Error */}
            {!data && isError && <GraphError dashboard={dashboard} />}

            {/* Loading (only at first data fetch) */}
            {!data && !isError && <GraphLoading dashboard={dashboard} />}

            {/* Graph */}
            {data && (
                <>
                    {/* Bar chart */}
                    <div className="mb-3 mt-3 w-full">
                        <ResponsiveContainer height={400} className="bg-white">
                            <BarChart
                                data={data.responses_breakdown}
                                margin={{ top: 15, right: 50, left: 10, bottom: 15 }}
                                width={750}
                                height={500}
                                layout="vertical"
                                barCategoryGap={5}
                            >
                                <XAxis dataKey="count" type="number" axisLine={false} tickCount={7} />
                                <YAxis
                                    dataKey="description"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    width={450}
                                />
                                <CartesianGrid strokeDasharray="0" stroke="#FFFFFF" />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    content={<CustomTooltip dashboard={dashboard} />}
                                    position={{ x: 25 }}
                                />
                                <Bar dataKey="count" className={barClasses} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </Box>
    )
}

const CustomTooltip = ({ active, payload, label, dashboard }: ICustomTooltip) => {
    if (active && payload && payload.length) {
        const value = payload[0].value

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
                <span className="font-bold">{value}</span> people mentioned <span className="font-bold">“{label}”</span>
                .
            </p>
        )
    }

    return null
}
