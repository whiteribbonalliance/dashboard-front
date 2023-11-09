import { DashboardName } from '@enums'
import {
    allCampaignsConfig,
    economicEmpowermentMexicoConfig,
    healthwellbeingConfig,
    midwivesVoicesConfig,
    whatWomenWantConfig,
    whatWomenWantPakistanConfig,
    whatYoungPeopleWantConfig,
    womensEconomicEmpowermentConfig,
} from '@configurations'
import { TDashboard } from '@types'
import { v4 as uuidv4 } from 'uuid'
import { getDefaultFilterValues, TFilter } from '@schemas/filter'
import _ from 'lodash'
import { ICampaignRequest } from '@interfaces'

/**
 * Merge Tailwind CSS classes
 *
 * @param classes Tailwind CSS classes
 */
export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

/**
 * Get the dashboard config
 *
 * @param dashboard The dashboard
 */
export function getDashboardConfig(dashboard: TDashboard) {
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            return whatWomenWantConfig
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            return whatYoungPeopleWantConfig
        case DashboardName.MIDWIVES_VOICES:
            return midwivesVoicesConfig
        case DashboardName.HEALTHWELLBEING:
            return healthwellbeingConfig
        case DashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
            return economicEmpowermentMexicoConfig
        case DashboardName.WHAT_WOMEN_WANT_PAKISTAN:
            return whatWomenWantPakistanConfig
        case DashboardName.WOMENS_ECONOMIC_EMPOWERMENT:
            return womensEconomicEmpowermentConfig
        case DashboardName.ALL_CAMPAIGNS:
            return allCampaignsConfig
    }
}

/***
 * Returns a "nice" number approximately equal to range
 * Rounds the number if round = true Takes the ceiling if round = false
 *
 * @param range The range
 * @param round Round or not
 */
export function niceNum(range: number, round: boolean) {
    if (range === 0) {
        range = 1
    }

    const exponent = Math.floor(Math.log10(range))
    const fraction = range / Math.pow(10, exponent)

    let niceFraction: number
    if (round) {
        if (fraction < 1.5) {
            niceFraction = 1
        } else if (fraction < 3) {
            niceFraction = 2
        } else if (fraction < 7) {
            niceFraction = 5
        } else {
            niceFraction = 10
        }
    } else {
        if (fraction <= 1) {
            niceFraction = 1
        } else if (fraction <= 2) {
            niceFraction = 2
        } else if (fraction <= 5) {
            niceFraction = 5
        } else {
            niceFraction = 10
        }
    }

    return Math.round(niceFraction * Math.pow(10, exponent))
}

/**
 * Format number to thousands separator
 *
 * @param num
 * @param lang
 */
export function toThousandsSep(num: number, lang: string) {
    let formattedNumber: string
    try {
        formattedNumber = num.toLocaleString(lang)
    } catch (error) {
        formattedNumber = num.toLocaleString('en')
    }

    return formattedNumber
}

/**
 * Find numbers in a text and apply thousands separator
 *
 * @param text The text
 * @param lang The language
 */
export function applyToThousandsSepOnText(text: string, lang: string) {
    const pattern = /-?\d*\.?,?\d+/g
    let textCopy = text.slice()
    const matches = textCopy.match(pattern)
    if (matches) {
        for (const match of matches) {
            if (match.length < 4) continue
            if (match.includes(',') || match.includes('.')) continue
            try {
                textCopy = textCopy.replace(match, toThousandsSep(Number(match), lang))
            } catch (error) {}
        }

        return textCopy
    }

    return text
}

/**
 * Get CSV file name from headers.
 * If the filename is not present in headers, a random filename will be generated.
 *
 * @param headers Headers
 */
export function getCsvFileNameFromHeaders(headers: Headers) {
    const contentDisposition = headers.get('content-disposition')
    let filename = ''
    if (contentDisposition) {
        filename = contentDisposition.split('filename=')[1]
    }
    if (filename === '') {
        filename = `${uuidv4().replace('-', '')}.csv`
    }

    return filename
}

/**
 * Download CSV blob
 *
 * @param blob The Blob
 * @param filename The filename
 */
export function downloadCsvBlob(blob: Blob, filename: string) {
    const file = new File([blob], filename, { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(file)
    window.open(url, '_blank')
    URL.revokeObjectURL(url)
}

/**
 * Get campaign request
 *
 * @param dashboard The dashboard
 * @param filters The filters
 */
export function getCampaignRequest(
    dashboard: TDashboard,
    filters: {
        filter1?: TFilter
        filter2?: TFilter
    }
) {
    const filtersClone = _.cloneDeep(filters)

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

    const campaignRequest: ICampaignRequest = { filter_1: filter1, filter_2: filter2 }

    return campaignRequest
}
