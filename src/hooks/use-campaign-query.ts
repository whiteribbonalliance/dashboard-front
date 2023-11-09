'use client'

import { useQuery } from 'react-query'
import { ICampaign } from '@interfaces'
import { getCampaign, getCampaignsMerged } from '@services/wra-dashboard-api'
import { getCampaignRequest, getDashboardConfig } from '@utils'
import { DashboardName } from '@enums'
import { useContext } from 'react'
import { ParamsContext } from '@contexts/params'

export const useCampaignQuery = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, filters, lang, questionAskedCode, responseYear } = params

    const campaignRequest = getCampaignRequest(dashboard, filters)

    return useQuery<ICampaign>({
        queryKey: [params, 'campaign'],
        queryFn: ({ signal }) => {
            if (dashboard === DashboardName.ALL_CAMPAIGNS) {
                // Use getCampaignsMerged function (uses a special endpoint to fetch data of all campaigns merged)
                return getCampaignsMerged(campaignRequest, lang, signal)
            } else {
                // Use get getCampaign function to fetch dashboard
                const config = getDashboardConfig(dashboard)
                return getCampaign(config, campaignRequest, lang, questionAskedCode, responseYear, signal)
            }
        },
        refetchOnWindowFocus: false,
        retry: 3,
        cacheTime: 0,
    })
}
