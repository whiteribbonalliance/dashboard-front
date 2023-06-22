import { ICampaign, ICampaignRequest, IFilterOptions } from '@interfaces'
import { dashboardToCampaignCode } from '@utils'
import { Option } from '@types'

const apiUrl = process.env.NEXT_PUBLIC_WRA_DASHBOARD_API_URL as string
const headers = { 'Content-Type': 'application/json' }

/**
 * Get campaign filter options
 *
 * @param dashboard The dashboard
 * @param lang The language
 */
export async function getCampaignFilterOptions(dashboard: string, lang: string) {
    const campaign = dashboardToCampaignCode(dashboard)
    const response = await fetch(`${apiUrl}/campaigns/${campaign}/filter-options?lang=${lang}`, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaign filter options')
    }

    const data: IFilterOptions = await response.json()

    return data
}

/**
 * Get campaign
 *
 * @param dashboard The dashboard
 * @param campaignRequest The campaign request
 * @param lang The language
 * @param signal Signal
 */
export async function getCampaign(
    dashboard: string,
    campaignRequest: ICampaignRequest,
    lang: string,
    signal: AbortSignal | null | undefined
) {
    const campaign = dashboardToCampaignCode(dashboard)
    const response = await fetch(`${apiUrl}/campaigns/${campaign}?lang=${lang}`, {
        signal: signal,
        method: 'POST',
        headers: headers,
        body: JSON.stringify(campaignRequest),
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaign')
    }

    const data: ICampaign = await response.json()

    return data
}

/**
 * Get campaign who the people are options
 *
 * @param dashboard The dashboard
 * @param lang The language
 */
export async function getCampaignWhoThePeopleAreOptions(dashboard: string, lang: string) {
    const campaign = dashboardToCampaignCode(dashboard)
    const response = await fetch(`${apiUrl}/campaigns/${campaign}/who-the-people-are-options?lang=${lang}`, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaign who the people are options')
    }

    const data: Option<string>[] = await response.json()

    return data
}
