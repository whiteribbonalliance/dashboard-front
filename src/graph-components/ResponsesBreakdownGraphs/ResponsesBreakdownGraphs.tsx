'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { DashboardName } from '@enums'
import { useCampaignQuery } from '@hooks/use-campaign-query'
import { getDashboardConfig } from '@utils'
import { Loading } from 'components/Loading'
import { GraphError } from 'components/GraphError'
import { useTranslation } from '@app/i18n/client'
import { TDashboard } from '@types'
import React from 'react'
import { Tooltip } from '@components/Tooltip'
import { ResponsesBreakdownGraph } from '@graph-components/ResponsesBreakdownGraphs/ResponsesBrekadownGraph'

interface IResponsesBreakdownGraphsProps {
    dashboard: TDashboard
    lang: string
}

export const ResponsesBreakdownGraphs = ({ dashboard, lang }: IResponsesBreakdownGraphsProps) => {
    const { data, isError } = useCampaignQuery(dashboard, lang)
    const { t } = useTranslation(lang)
    const config = getDashboardConfig(dashboard)

    // Set breakdown responses topic text
    let breakdownResponsesTopicText: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            breakdownResponsesTopicText = t(`${config.campaignCode}-breakdown-responses-topic`)
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            breakdownResponsesTopicText = t(`${config.campaignCode}-breakdown-responses-topic`)
            break
        case DashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
            breakdownResponsesTopicText = t(`${config.campaignCode}-breakdown-responses-topic`)
            break
        default:
            breakdownResponsesTopicText = t('breakdown-responses-topic')
    }

    // Set click view topic responses text
    let clickViewTopicResponsesText: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            clickViewTopicResponsesText = t(`${config.campaignCode}-click-view-topic-responses`)
            break
        default:
            clickViewTopicResponsesText = t('click-view-topic-responses')
    }

    // Display graphs or not
    const displayGraphs = !!data

    return (
        <div>
            {/* Tooltip: responses breakdown */}
            <Tooltip
                id="responses-breakdown"
                dashboard={dashboard}
                title={'Topic breakdown'}
                paragraphs={[
                    'Each topic category is represented as a bar. The length of the bar represents how many respondents responded in that category.',
                    'You can click on a topic bar to filter for that category.',
                ]}
            />

            <Box>
                <div data-tooltip-id="responses-breakdown">
                    <GraphTitle dashboard={dashboard} text={breakdownResponsesTopicText} />
                </div>
                <p>{clickViewTopicResponsesText}</p>

                {/* Error */}
                {!data && isError && <GraphError dashboard={dashboard} />}

                {/* Loading (only at first data fetch) */}
                {!displayGraphs && !isError && <Loading dashboard={dashboard} />}

                {/* Graphs */}
                {displayGraphs && (
                    <div>
                        <ResponsesBreakdownGraph
                            dashboard={dashboard}
                            lang={lang}
                            data={data.responses_breakdown.parent_categories}
                            filtersAreIdentical={data.filters_are_identical}
                            filter1Description={data.filter_1_description}
                            filter2Description={data.filter_2_description}
                            is_sub={false}
                        />
                        <ResponsesBreakdownGraph
                            dashboard={dashboard}
                            lang={lang}
                            data={data.responses_breakdown.sub_categories}
                            filtersAreIdentical={data.filters_are_identical}
                            filter1Description={data.filter_1_description}
                            filter2Description={data.filter_2_description}
                            is_sub={true}
                        />
                    </div>
                )}
            </Box>
        </div>
    )
}
