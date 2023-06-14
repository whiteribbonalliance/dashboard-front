import { CampaignCode, DashboardName } from '@enums'

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
export function dashboardToCampaignCode(dashboard: string) {
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            return CampaignCode.WHAT_WOMEN_WANT
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            return CampaignCode.WHAT_YOUNG_PEOPLE_WANT
        case DashboardName.MIDWIVES_VOICES:
            return CampaignCode.MIDWIVES_VOICES
        default:
            return ''
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
