import { Campaign, DashboardCode } from '@enums'

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
export function getDashboardCampaign(dashboard: string) {
    switch (dashboard) {
        case DashboardCode.WHAT_WOMEN_WANT:
            return Campaign.WHAT_WOMEN_WANT
        case DashboardCode.WHAT_YOUNG_PEOPLE_WANT:
            return Campaign.WHAT_YOUNG_PEOPLE_WANT
        case DashboardCode.MIDWIVES_VOICES:
            return Campaign.MIDWIVES_VOICES
        default:
            return ''
    }
}

/**
 * Capitalize first letter
 *
 * @param value The value
 */
export function titleCase(value: string) {
    if (!value) return value

    return value[0].toUpperCase() + value.slice(1).toLowerCase()
}
