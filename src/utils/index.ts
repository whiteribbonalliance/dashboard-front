import { DashboardName } from '@enums'
import { parseDomain } from 'parse-domain'
import {
    gizConfig,
    healthWellBeingConfig,
    midwivesVoicesConfig,
    whatWomenWantConfig,
    whatYoungPeopleWantConfig,
    wwwPakistanConfig,
} from '@configurations'
import { TDashboard } from '@types'

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
        case DashboardName.HEALTH_WELL_BEING:
            return healthWellBeingConfig
        case DashboardName.GIZ:
            return gizConfig
        case DashboardName.WWW_PAKISTAN:
            return wwwPakistanConfig
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
