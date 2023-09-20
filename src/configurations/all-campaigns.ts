import { IConfiguration } from '@interfaces'
import {
    gizLink,
    healthwellbeingLink,
    midwivesvoicesLink,
    seoMainTitle,
    whatwomenwantLink,
    whatyoungpeoplewantLink,
    womenseconomicempowermentLink,
    wwwpakistanLink,
} from '@constants'
import { DashboardName } from '@enums'

const title = 'Dashboard of Dashboards'

export const configuration: IConfiguration = {
    id: DashboardName.ALL_CAMPAIGNS,
    campaignCode: '',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: 'Dashboard of Dashboards',
    respondentsNounSingular: 'respondent',
    respondentsNounPlural: 'respondents',
    dashboardLinksFooter: [
        whatwomenwantLink,
        whatyoungpeoplewantLink,
        midwivesvoicesLink,
        gizLink,
        wwwpakistanLink,
        healthwellbeingLink,
        womenseconomicempowermentLink,
    ],
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAskedCodes: ['q1'],
}
