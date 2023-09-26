import { IConfiguration } from '@interfaces'
import { seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = 'Dashboard of Dashboards'

export const configuration: IConfiguration = {
    id: DashboardName.ALL_CAMPAIGNS,
    title: title,
    campaignCode: '',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: 'Dashboard of Dashboards',
    respondentsNounSingular: 'respondent',
    respondentsNounPlural: 'respondents',
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    link: {
        id: DashboardName.ALL_CAMPAIGNS,
        title: title,
        link: 'https://explore.whiteribbonalliance.org/allcampaigns',
    },
}
