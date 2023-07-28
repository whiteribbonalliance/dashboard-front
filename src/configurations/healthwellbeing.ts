import { IConfiguration } from '@interfaces'
import { healthliteracyLink, midwivesvoicesLink, seoMainTitle, whatwomenwantLink } from '@constants'
import { DashboardName } from '@enums'

const title = 'What women want for health and wellbeing'

export const configuration: IConfiguration = {
    id: DashboardName.HEALTH_WELL_BEING,
    campaignCode: 'healthwellbeing',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: 'We asked women around the world, what they want to improve their health and wellbeing.',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    dashboardLinksFooter: [whatwomenwantLink, midwivesvoicesLink, healthliteracyLink],
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAskedCodes: [],
}
