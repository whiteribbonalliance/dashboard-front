/*
MIT License

Copyright (c) 2023 World We Want. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

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
import { getCampaign } from 'services/dashboard-api'
import { getCampaignRequest } from '@utils'
import { useContext } from 'react'
import { ParamsContext } from '@contexts/params'

export const useCampaignQuery = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, config, filters, lang, questionAskedCode, responseYear } = params
    const campaignRequest = getCampaignRequest(dashboard, filters)

    return useQuery<ICampaign>({
        queryKey: [params, 'campaign'],
        queryFn: ({ signal }) =>
            getCampaign(config.campaign_code, campaignRequest, lang, questionAskedCode, responseYear, signal),
        refetchOnWindowFocus: false,
        retry: 3,
        cacheTime: 0,
    })
}
