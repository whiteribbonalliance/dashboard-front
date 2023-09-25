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
import { TFilter } from '@schemas/filter'

// Use function
const defaultFilterValues: TFilter = {
    countries: [],
    regions: [],
    ages: [],
    age_ranges: [],
    genders: [],
    professions: [],
    response_topics: [],
    only_responses_from_categories: false,
    only_multi_word_phrases_containing_filter_term: false,
    keyword_filter: '',
    keyword_exclude: '',
}

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
 * Get default filter values
 */
export function getDefaultFilterValues() {
    return defaultFilterValues
}

/**
 * Get default filter values for dashboard
 *
 * @param dashboard The dashboard
 */
export function getDashboardDefaultFilterValues(dashboard: TDashboard) {
    let defaultFilterValuesForDashboard: TFilter
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT_PAKISTAN:
            defaultFilterValuesForDashboard = { ...defaultFilterValues }
            defaultFilterValuesForDashboard.countries = ['PK']
            return defaultFilterValuesForDashboard
        case DashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
            defaultFilterValuesForDashboard = { ...defaultFilterValues }
            defaultFilterValuesForDashboard.countries = ['MX']
            return defaultFilterValuesForDashboard
        default:
            return defaultFilterValues
    }
}
