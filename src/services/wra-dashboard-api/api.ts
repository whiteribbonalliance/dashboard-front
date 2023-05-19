import { ICampaignFilterOptions } from '@interfaces/wra-dashboard-api/campaign/filter-options'
import { getDashboardCampaign } from '@utils'
import { ICampaignCountryRegions } from '@interfaces/wra-dashboard-api/campaign/country-regions'

const headers = { 'Content-Type': 'application/json' }

/**
 * Get campaign filter options
 *
 * @param dashboard The dashboard
 */
export async function getCampaignFilterOptions(dashboard: string) {
    const apiUrl = process.env.NEXT_PUBLIC_WRA_DASHBOARD_API_URL as string

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
 * Get campaign country regions
 *
 * @param dashboard The dashboard
 * @param country The country
 */
export async function getCampaignCountryRegions(dashboard: string, country: string) {
    const apiUrl = process.env.NEXT_PUBLIC_WRA_DASHBOARD_API_URL as string

    const campaign = getDashboardCampaign(dashboard)
    const response = await fetch(`${apiUrl}/campaigns/${campaign}/countries/${country}/regions`, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaign country regions')
    }

    const data: ICampaignCountryRegions = await response.json()

    return data
}
