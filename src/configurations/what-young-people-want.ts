import { IConfiguration } from '@interfaces'
import { DashboardName } from '@enums'

const title = 'What Young People Want'

export const configuration: IConfiguration = {
    id: DashboardName.WHAT_YOUNG_PEOPLE_WANT,
    title: title,
    campaignCode: 'pmn01a',
    seoTitle: 'Results Dashboard | PMNCH',
    seoMetaDescription: 'What Young People Want Interactive Dashboard',
    respondentsNounSingular: 'respondent',
    respondentsNounPlural: 'respondents',
    showVideoLink: 'https://youtu.be/E6_ERqyI8nA',
    link: {
        id: DashboardName.WHAT_YOUNG_PEOPLE_WANT,
        title: title,
        link: 'https://whatyoungpeoplewant.whiteribbonalliance.org',
    },
}
