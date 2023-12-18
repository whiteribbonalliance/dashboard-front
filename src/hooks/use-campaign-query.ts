/*
MIT License

Copyright (c) 2023 White Ribbon Alliance. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

'use client'

import { useQuery } from 'react-query'
import { ICampaign } from '@interfaces'
import { getCampaign, getCampaignsMerged } from 'services/dashboard-api'
import { getCampaignRequest } from '@utils'
import { LegacyDashboardName } from '@enums'
import { useContext } from 'react'
import { ParamsContext } from '@contexts/params'
import { ConfigurationContext } from '@contexts/configuration'

export const useCampaignQuery = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, filters, lang, questionAskedCode, responseYear } = params
    const { currentCampaignConfiguration } = useContext(ConfigurationContext)
    const campaignRequest = getCampaignRequest(dashboard, filters)

    return useQuery<ICampaign>({
        queryKey: [params, 'campaign'],
        queryFn: ({ signal }) => {
            if (dashboard === LegacyDashboardName.ALL_CAMPAIGNS) {
                // Use getCampaignsMerged function (uses a special endpoint to fetch data of all campaigns merged)
                return getCampaignsMerged(campaignRequest, lang, signal)
            } else {
                // Use get getCampaign function to fetch dashboard
                return getCampaign(
                    currentCampaignConfiguration,
                    campaignRequest,
                    lang,
                    questionAskedCode,
                    responseYear,
                    signal
                )
            }
        },
        refetchOnWindowFocus: false,
        retry: 3,
        cacheTime: 0,
    })
}
