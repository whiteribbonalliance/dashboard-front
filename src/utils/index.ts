import { Campaigns, Dashboards } from '@enums'

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
        case Dashboards.WHAT_WOMEN_WANT:
            return Campaigns.WHAT_WOMEN_WANT
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            return Campaigns.WHAT_YOUNG_PEOPLE_WANT
        case Dashboards.MIDWIVES_VOICES:
            return Campaigns.MIDWIVES_VOICES
        default:
            return ''
    }
}
