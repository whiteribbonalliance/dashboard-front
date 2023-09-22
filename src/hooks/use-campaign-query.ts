'use client'

import { useQuery } from 'react-query'
import { ICampaign } from '@interfaces'
import { getCampaign, getCampaignsMerged } from '@services/wra-dashboard-api'
import { useFiltersStore } from '@stores/filters'
import { useEffect } from 'react'
import _ from 'lodash'
import { TDashboard } from '@types'
import { getDashboardConfig, getDefaultFilterValuesForDashboard } from '@utils'
import { useQuestionAskedCodeStore } from '@stores/question-asked-code'
import { DashboardName } from '@enums'
import { useAllCampaignsActiveDashboardStore } from '@stores/all-campaigns-active-dashboard'

export const useCampaignQuery = (dashboard: TDashboard, lang: string) => {
    let filters = useFiltersStore((state) => state.filters)
    const filtersClone = _.cloneDeep(filters)

    // Question asked code
    const questionAskedCode = useQuestionAskedCodeStore((state) => state.questionAskedCode)

    // Current selected campaign at allcampaigns dashboard
    const allCampaignsActiveDashboard = useAllCampaignsActiveDashboardStore(
        (state) => state.allCampaignsActiveDashboard
    )

    // 'healthwellbeing' at 'q2' should ignore response topics filtering
    if (dashboard === DashboardName.HEALTHWELLBEING && questionAskedCode === 'q2') {
        if (filtersClone.filter1) {
            filtersClone.filter1.response_topics = []
            filtersClone.filter1.only_responses_from_categories = false
        }
        if (filtersClone.filter2) {
            filtersClone.filter2.response_topics = []
            filtersClone.filter2.only_responses_from_categories = false
        }
    }

    // If the filter has not changed from the default filter values then do not send it with the request
    const defaultFilterValues = getDefaultFilterValuesForDashboard(dashboard)
    const filter1 = _.isEqual(filtersClone.filter1, defaultFilterValues) ? undefined : filtersClone.filter1
    const filter2 = _.isEqual(filtersClone.filter2, defaultFilterValues) ? undefined : filtersClone.filter2

    const campaignQuery = useQuery<ICampaign>({
        queryKey: [`campaign-${dashboard}`],
        queryFn: ({ signal }) => {
            if (dashboard === DashboardName.ALL_CAMPAIGNS) {
                // Use getCampaignsMerged function (uses a special endpoint to fetch data of all campaigns merged)
                if (allCampaignsActiveDashboard === DashboardName.ALL_CAMPAIGNS) {
                    return getCampaignsMerged(
                        {
                            filter_1: filter1,
                            filter_2: filter2,
                        },
                        lang,
                        signal
                    )
                }

                // Use get getCampaign function to fetch allCampaignsActiveDashboard
                else {
                    const config = getDashboardConfig(allCampaignsActiveDashboard)
                    return getCampaign(
                        config,
                        {
                            filter_1: filter1,
                            filter_2: filter2,
                        },
                        lang,
                        questionAskedCode,
                        signal
                    )
                }
            }

            // Use get getCampaign function to fetch dashboard
            else {
                const config = getDashboardConfig(dashboard)
                return getCampaign(
                    config,
                    {
                        filter_1: filter1,
                        filter_2: filter2,
                    },
                    lang,
                    questionAskedCode,
                    signal
                )
            }
        },
        refetchOnWindowFocus: false,
    })

    // Refetch function
    const refetch = campaignQuery.refetch

    // Refetch campaign when any of the dependencies change
    useEffect(() => {
        refetch({ cancelRefetch: true }).then()
    }, [refetch, filters, questionAskedCode, allCampaignsActiveDashboard])

    return campaignQuery
}
