import { CampaignCode, DashboardName } from '@enums'
import { parseDomain } from 'parse-domain'

/**
 * Merge Tailwind CSS classes
 *
 * @param classes Tailwind CSS classes
 */
export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

/**
 * Get the campaign code of a dashboard
 *
 * @param dashboard The dashboard
 */
export function dashboardNameToCampaignCode(dashboard: string) {
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            return CampaignCode.WHAT_WOMEN_WANT
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            return CampaignCode.WHAT_YOUNG_PEOPLE_WANT
        case DashboardName.MIDWIVES_VOICES:
            return CampaignCode.MIDWIVES_VOICES
        case DashboardName.HEALTH_WELL_BEING:
            return CampaignCode.HEALTH_WELL_BEING
        case DashboardName.GIZ:
            return CampaignCode.GIZ
        case DashboardName.WWW_PAKISTAN:
            return CampaignCode.WWW_PAKISTAN
        default:
            return undefined
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
 * Check if url is subdomain
 *
 * @param url The url
 */
export function isSubdomain(url: string) {
    url = url.split(':')[0]

    if (url.endsWith('.local')) {
        url = url.replace('.local', '.com')
    }

    const parseResult = parseDomain(url)
    const { subDomains } = parseResult as any

    return !!subDomains
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
