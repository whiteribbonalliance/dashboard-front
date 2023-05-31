'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { DashboardName } from '@enums'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'
import { useCampaignQuery } from '@hooks/use-campaign'
import { Spinner } from '@components/Spinner'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { classNames } from '@utils'

interface IResponsesBreakdownGraphProps {
    dashboard: string
}

interface ICustomTooltip extends TooltipProps<ValueType, NameType> {
    dashboard: string
}

export const ResponsesBreakdownGraph = ({ dashboard }: IResponsesBreakdownGraphProps) => {
    // Campaign query
    const { data, isSuccess, isLoading, isRefetching, isError } = useCampaignQuery(dashboard)

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

    // Set bar color
    let barColor: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            barColor = 'fill-pmnchColors-secondary hover:fill-pmnchColors-secondaryFaint'
            break
        default:
            barColor = 'fill-defaultColors-secondary hover:fill-defaultColors-secondaryFaint'
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
            {isError && <div className="my-5 flex">Could not load bar chart</div>}

            {/* Loading */}
            {(isLoading || isRefetching) && <Spinner dashboard={dashboard} />}

            {/* Success */}
            {isSuccess && !isRefetching && (
                <>
                    {/* Bar chart */}
                    <div className="mb-3 mt-3 w-full bg-white">
                        <ResponsiveContainer width="100%" height={400}>
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
                                <Bar dataKey="count" className={barColor} />
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
