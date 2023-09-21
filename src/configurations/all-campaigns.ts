import { IConfiguration } from '@interfaces'
import { seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = 'Dashboard of Dashboards'

export const configuration: IConfiguration = {
    id: DashboardName.ALL_CAMPAIGNS,
    campaignCode: '',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: 'Dashboard of Dashboards',
    respondentsNounSingular: 'respondent',
    respondentsNounPlural: 'respondents',
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAskedCodes: ['q1'],
    link: {
        id: DashboardName.ALL_CAMPAIGNS,
        title: 'Dashboard of dashboards',
        link: 'https://explore.whiteribbonalliance.org/allcampaigns',
    },
}
