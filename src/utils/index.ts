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
export function getDashboardCampaignCode(dashboard: string) {
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

/**
 * Capitalize first letter
 *
 * @param value The value
 */
export function titleCase(value: string) {
    if (!value) return value

    return value[0].toUpperCase() + value.slice(1).toLowerCase()
}
