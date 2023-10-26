'use client'

import { useQuery } from 'react-query'
import { ICampaign } from '@interfaces'
import { getCampaign, getCampaignsMerged } from '@services/wra-dashboard-api'
import _ from 'lodash'
import { getDashboardConfig } from '@utils'
import { DashboardName } from '@enums'
import { getDefaultFilterValues } from '@schemas/filter'
import { useContext } from 'react'
import { ParamsContext } from '@contexts/params'

export const useCampaignQuery = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang } = params

    const filtersClone = _.cloneDeep(params.filters)

    // Only filter by province if there is no district selected at wwwpakistan
    if (dashboard === DashboardName.WHAT_WOMEN_WANT_PAKISTAN) {
        if (filtersClone.filter1 && filtersClone.filter1.regions.length > 0) {
            filtersClone.filter1.provinces = []
        }
        if (filtersClone.filter2 && filtersClone.filter2.regions.length > 0) {
            filtersClone.filter2.provinces = []
        }
    }

    // If the filter has not changed from the default filter values then do not send it with the request
    const defaultFilterValues = getDefaultFilterValues(dashboard)
    const filter1 = _.isEqual(filtersClone.filter1, defaultFilterValues) ? undefined : filtersClone.filter1
    const filter2 = _.isEqual(filtersClone.filter2, defaultFilterValues) ? undefined : filtersClone.filter2

    return useQuery<ICampaign>({
        queryKey: [params, 'campaign'],
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
                    params.questionAskedCode,
                    params.responseYear,
                    signal
                )
            }
        },
        refetchOnWindowFocus: false,
        retry: 3,
        cacheTime: 0,
    })
}
