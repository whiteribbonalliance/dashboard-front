import { IConfiguration } from '@interfaces'
import { seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = 'What Women Want'

export const configuration: IConfiguration = {
    id: DashboardName.WHAT_WOMEN_WANT,
    title: title,
    campaignCode: 'wra03a',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription:
        'We asked over a million women what they want. Explore our survey responses with our interactive dashboard!',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAskedCodes: ['q1'],
    link: {
        id: DashboardName.WHAT_WOMEN_WANT,
        title: title,
        link: 'https://whatwomenwant.whiteribbonalliance.org',
    },
}
