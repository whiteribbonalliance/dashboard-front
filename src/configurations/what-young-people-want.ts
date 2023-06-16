import { IConfiguration } from '@interfaces'
import { healthLiteracyLink, midwivesVoicesLink, whatWomenWantLink } from '@constants'
import { DashboardName } from '@enums'

const title = 'Results Dashboard'

export const configuration: IConfiguration = {
    id: DashboardName.WHAT_YOUNG_PEOPLE_WANT,
    title: title,
    seoTitle: `${title} | PMNCH`,
    seoMetaDescription: 'What Young People Want Interactive Dashboard',
    respondentsNounSingular: 'respondent',
    respondentsNounPlural: 'respondents',
    dashboardLinksFooter: [whatWomenWantLink, healthLiteracyLink, midwivesVoicesLink],
    showVideoLink: 'https://youtu.be/E6_ERqyI8nA',
}
