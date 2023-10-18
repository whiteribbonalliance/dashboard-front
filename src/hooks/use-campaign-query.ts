'use client'

import { useQuery } from 'react-query'
import { ICampaign } from '@interfaces'
import { getCampaign, getCampaignsMerged } from '@services/wra-dashboard-api'
import { useFiltersStore } from '@stores/filters'
import { useEffect } from 'react'
import _ from 'lodash'
import { TDashboard } from '@types'
import { getDashboardConfig } from '@utils'
import { useQuestionAskedCodeStore } from '@stores/question-asked-code'
import { DashboardName } from '@enums'
import { useResponseYearStore } from '@stores/response-year'
import { getDefaultFilterValues } from '@schemas/filter'

export const useCampaignQuery = (dashboard: TDashboard, lang: string) => {
    const filters = useFiltersStore((state) => state.filters)
    const filtersClone = _.cloneDeep(filters)

    // Question asked code
    const questionAskedCode = useQuestionAskedCodeStore((state) => state.questionAskedCode)

    // Response year
    const responseYear = useResponseYearStore((state) => state.responseYear)

    // Only filter by province if there is no district selected at wwwpakistan
    if (dashboard === DashboardName.WHAT_WOMEN_WANT_PAKISTAN) {
        if (filtersClone.filter1.regions.length > 0) {
            filtersClone.filter1.provinces = []
        }
        if (filtersClone.filter2.regions.length > 0) {
            filtersClone.filter2.provinces = []
        }
    }

    // If the filter has not changed from the default filter values then do not send it with the request
    const filter1 = _.isEqual(filtersClone.filter1, getDefaultFilterValues()) ? undefined : filtersClone.filter1
    const filter2 = _.isEqual(filtersClone.filter2, getDefaultFilterValues()) ? undefined : filtersClone.filter2

    const campaignQuery = useQuery<ICampaign>({
        queryKey: [`${dashboard}-${lang}-campaign`],
        queryFn: ({ signal }) => {
            if (dashboard === DashboardName.ALL_CAMPAIGNS) {
                // Use getCampaignsMerged function (uses a special endpoint to fetch data of all campaigns merged)
                return getCampaignsMerged(
                    {
                        filter_1: filter1,
                        filter_2: filter2,
                    },
                    lang,
                    signal
                )
            } else {
                // Use get getCampaign function to fetch dashboard
                const config = getDashboardConfig(dashboard)
                return getCampaign(
                    config,
                    {
                        filter_1: filter1,
                        filter_2: filter2,
                    },
                    lang,
                    questionAskedCode,
                    responseYear,
                    signal
                )
            }
        },
        refetchOnWindowFocus: false,
        retry: 3,
    })

    // Refetch function
    const refetch = campaignQuery.refetch

    // Refetch campaign when any of the dependencies change
    useEffect(() => {
        refetch({ cancelRefetch: true }).then()
    }, [refetch, filters, questionAskedCode, responseYear])

    return campaignQuery
}
