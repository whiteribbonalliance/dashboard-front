import { IConfiguration } from '@interfaces'
import { healthliteracyLink, midwivesvoicesLink, seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = 'What Women Want'

export const configuration: IConfiguration = {
    id: DashboardName.WHAT_WOMEN_WANT,
    campaignCode: 'wra03a',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription:
        'We asked over a million women what they want. Explore our survey responses with our interactive dashboard!',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    dashboardLinksFooter: [midwivesvoicesLink, healthliteracyLink],
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAsked: [],
}
