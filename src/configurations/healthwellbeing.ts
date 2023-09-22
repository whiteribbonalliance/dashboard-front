import { IConfiguration } from '@interfaces'
import { seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = 'What women want for health and wellbeing'

export const configuration: IConfiguration = {
    id: DashboardName.HEALTHWELLBEING,
    title: title,
    campaignCode: 'healthwellbeing',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: 'We asked women around the world, what they want to improve their health and wellbeing.',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAskedCodes: ['q1', 'q2'],
    link: {
        id: DashboardName.HEALTHWELLBEING,
        title: title,
        link: 'https://explore.whiteribbonalliance.org/healthwellbeing',
    },
}
