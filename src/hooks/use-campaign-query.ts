'use client'

import { useQuery } from 'react-query'
import { ICampaign } from '@interfaces'
import { getCampaign, getCampaignsMerged } from '@services/wra-dashboard-api'
import { useFiltersStore } from '@stores/filters'
import { useEffect } from 'react'
import { defaultFilterValues } from '@constants'
import _ from 'lodash'
import { TDashboard } from '@types'
import { getDashboardConfig } from '@utils'
import { useQuestionAskedCodeStore } from '@stores/question-asked-code'
import { DashboardName } from '@enums'

export const useCampaignQuery = (dashboard: TDashboard, lang: string) => {
    let filters = useFiltersStore((state) => state.filters)
    const filtersClone = _.cloneDeep(filters)

    const questionAskedCode = useQuestionAskedCodeStore((state) => state.questionAskedCode)
    const config = getDashboardConfig(dashboard)

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
    const filter1 = _.isEqual(filtersClone.filter1, defaultFilterValues) ? undefined : filtersClone.filter1
    const filter2 = _.isEqual(filtersClone.filter2, defaultFilterValues) ? undefined : filtersClone.filter2

    const campaignQuery = useQuery<ICampaign>({
        queryKey: [`campaign-${dashboard}`],
        queryFn: ({ signal }) => {
            // Use getCampaignsMerged function (uses a special endpoint to fetch data of all campaigns merged)
            if (dashboard === DashboardName.ALL_CAMPAIGNS) {
                return getCampaignsMerged(
                    {
                        filter_1: filter1,
                        filter_2: filter2,
                    },
                    lang,
                    signal
                )
            }

            // Use get getCampaign function
            else {
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

    // Refetch campaign on filters change
    useEffect(() => {
        refetch({ cancelRefetch: true }).then()
    }, [refetch, filters, questionAskedCode])

    return campaignQuery
}
