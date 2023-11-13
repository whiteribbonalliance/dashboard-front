import { ICampaign, ICampaignRequest, IConfiguration, IFilterOptions } from '@interfaces'
import { TOption } from '@types'
import { downloadCsvBlob, getCsvFileNameFromHeaders } from '@utils'

const apiUrl = process.env.NEXT_PUBLIC_WRA_DASHBOARD_API_URL
const headers = { 'Content-Type': 'application/json' }

/**
 * Get campaign filter options
 *
 * @param config The campaign configuration
 * @param lang The language
 */
export async function getCampaignFilterOptions(config: IConfiguration, lang: string) {
    const response = await fetch(`${apiUrl}/campaigns/${config.campaignCode}/filter-options?lang=${lang}`, {
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
 * Get campaigns merged filter options
 *
 * @param lang The language
 */
export async function getCampaignsMergedFilterOptions(lang: string) {
    const response = await fetch(`${apiUrl}/campaigns-merged/filter-options?lang=${lang}`, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaigns merged filter options')
    }

    const data: IFilterOptions = await response.json()

    return data
}

/**
 * Get campaign
 *
 * @param config The campaign configuration
 * @param campaignRequest The campaign request
 * @param lang The language
 * @param qCode The question code
 * @param response_year The response year
 * @param signal Signal
 */
export async function getCampaign(
    config: IConfiguration,
    campaignRequest: ICampaignRequest,
    lang: string,
    qCode: string,
    response_year: string,
    signal: AbortSignal | null | undefined
) {
    const response = await fetch(
        `${apiUrl}/campaigns/${config.campaignCode}?q_code=${qCode}&response_year=${response_year}&lang=${lang}`,
        {
            signal: signal,
            method: 'POST',
            headers: headers,
            body: JSON.stringify(campaignRequest),
        }
    )

    if (!response.ok) {
        throw new Error('Failed to fetch campaign')
    }

    const data: ICampaign = await response.json()

    return data
}

/**
 * Get campaign
 *
 * @param campaignRequest The campaign request
 * @param lang The language
 * @param signal Signal
 */
export async function getCampaignsMerged(
    campaignRequest: ICampaignRequest,
    lang: string,
    signal: AbortSignal | null | undefined
) {
    const response = await fetch(`${apiUrl}/campaigns-merged?lang=${lang}`, {
        signal: signal,
        method: 'POST',
        headers: headers,
        body: JSON.stringify(campaignRequest),
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaigns merged')
    }

    const data: ICampaign = await response.json()

    return data
}

/**
 * Get campaign histogram options
 *
 * @param config The campaign configuration
 * @param lang The language
 */
export async function getCampaignHistogramOptions(config: IConfiguration, lang: string) {
    const response = await fetch(`${apiUrl}/campaigns/${config.campaignCode}/histogram-options?lang=${lang}`, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaign histogram options')
    }

    const data: TOption<string>[] = await response.json()

    return data
}

/**
 * Get campaigns merged histogram options
 *
 * @param lang The language
 */
export async function getCampaignsMergedHistogramOptions(lang: string) {
    const response = await fetch(`${apiUrl}/campaigns-merged/histogram-options?lang=${lang}`, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Failed to fetch campaigns merged histogram options')
    }

    const data: TOption<string>[] = await response.json()

    return data
}

/**
 * Download campaign public data
 *
 * @param config The campaign configuration
 * @param campaignRequest The campaign request
 * @param response_year The response year
 */
export async function downloadCampaignPublicData(
    config: IConfiguration,
    campaignRequest: ICampaignRequest,
    response_year: string
) {
    const response = await fetch(
        `${apiUrl}/campaigns/${config.campaignCode}/public/data?response_year=${response_year}`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(campaignRequest),
        }
    )

    if (!response.ok) {
        throw new Error('Failed to fetch campaign public data')
    }

    // Get file name from headers
    const filename = getCsvFileNameFromHeaders(response.headers)

    // Create blob
    const blob = await response.blob()

    // Download
    downloadCsvBlob(blob, filename)
}
