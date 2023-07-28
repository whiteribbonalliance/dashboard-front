import { IConfiguration } from '@interfaces'
import { healthliteracyLink, midwivesvoicesLink, whatwomenwantLink } from '@constants'
import { DashboardName } from '@enums'

const title = 'Results Dashboard'

export const configuration: IConfiguration = {
    id: DashboardName.WHAT_YOUNG_PEOPLE_WANT,
    campaignCode: 'pmn01a',
    seoTitle: `${title} | PMNCH`,
    seoMetaDescription: 'What Young People Want Interactive Dashboard',
    respondentsNounSingular: 'respondent',
    respondentsNounPlural: 'respondents',
    dashboardLinksFooter: [whatwomenwantLink, healthliteracyLink, midwivesvoicesLink],
    showVideoLink: 'https://youtu.be/E6_ERqyI8nA',
    questionsAsked: [],
}
