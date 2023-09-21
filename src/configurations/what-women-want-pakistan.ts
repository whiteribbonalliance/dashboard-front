import { IConfiguration } from '@interfaces'
import { seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = 'What Women Want Pakistan'

export const configuration: IConfiguration = {
    id: DashboardName.WHAT_WOMEN_WANT_PAKISTAN,
    campaignCode: 'wwwpakistan',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: 'We asked 245311 women in Pakistan, what they want to improve their health and wellbeing.',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAskedCodes: ['q1'],
    link: {
        id: DashboardName.WHAT_WOMEN_WANT_PAKISTAN,
        title: 'What Women Want Pakistan',
        link: 'https://explore.whiteribbonalliance.org/wwwpakistan',
    },
}
