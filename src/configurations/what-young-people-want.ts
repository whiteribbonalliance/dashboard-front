import { IConfiguration } from '@interfaces'
import { healthLiteracyLink, midwivesVoicesLink, whatWomenWantLink } from '@constants'
import { DashboardName } from '@enums'

const title = 'Results Dashboard'

export const configuration: IConfiguration = {
    id: DashboardName.WHAT_YOUNG_PEOPLE_WANT,
    title: title,
    seoTitle: `${title} | PMNCH`,
    seoMetaDescription: 'What Young People Want Interactive Dashboard',
    subtext:
        'Welcome to the "What Young People Want" Dashboard! This interactive tool provides a visual representation of the responses and insights we are gathering from young people aged 10-24 around the world. The core of the initiative is an open-ended question: "To improve my well-being, I want...". Young people from across the globe have been answering this, giving us unique insights into their needs, hopes, and aspirations. Explore the data, discover the stories behind the numbers, and join us in amplifying the voices of 1.8 billion young people worldwide. To learn more about the campaign, visit http://www.1point8.org.',
    respondentsNounSingular: 'respondent',
    respondentsNounPlural: 'respondents',
    dashboardLinksFooter: [whatWomenWantLink, healthLiteracyLink, midwivesVoicesLink],
    questionAsked: 'To improve my well-being, I want...',
    showVideoLink: 'https://youtu.be/E6_ERqyI8nA',
    aboutUs: 'About PMNCH',
}
