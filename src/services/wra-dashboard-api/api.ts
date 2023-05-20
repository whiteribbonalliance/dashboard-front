import { ICampaignCountry, ICampaignFilterOptions } from '@interfaces'
import { getDashboardCampaign } from '@utils'

const apiUrl = process.env.NEXT_PUBLIC_WRA_DASHBOARD_API_URL as string
const headers = { 'Content-Type': 'application/json' }

/**
 * Get campaign filter options
 *
 * @param dashboard The dashboard
 */
export async function getCampaignFilterOptions(dashboard: string) {
    const campaign = getDashboardCampaign(dashboard)
    const response = await fetch(`${apiUrl}/campaigns/${campaign}/filter-options`, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaign filter options')
    }

    const data: ICampaignFilterOptions = await response.json()

    return data
}

/**
 * Get country
 *
 * @param dashboard The dashboard
 * @param alpha2Code The country alpha 2 code
 */
export async function getCountry(dashboard: string, alpha2Code: string) {
    const campaign = getDashboardCampaign(dashboard)
    const response = await fetch(`${apiUrl}/campaigns/${campaign}/countries/${alpha2Code}`, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaign country regions')
    }

    const data: ICampaignCountry = await response.json()

    return data
}
