import { IConfiguration } from '@interfaces/configuration'
import { healthLiteracyLink, midwivesVoicesLink, seoMainTitle, whatWomenWantLink } from '@constants'
import { Dashboards } from '@enums'

const title = 'What Young People Want'

export const configuration: IConfiguration = {
    id: Dashboards.WHAT_YOUNG_PEOPLE_WANT,
    title: title,
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: 'What Young People Want Interactive Dashboard',
    subtext:
        'Welcome to the “What Young People Want” Dashboard! This interactive tool provides a visual representation of the responses and insights we’ve gathered from young people aged 10-24 around the world, categorized into five key domains: Good Health & Optimum Nutrition, Connectedness and Positive Values, Safety and Supportive Environments, Learning and Employability, and Agency and Resilience. Here. You’ll find trends, patterns, and themes that have emerged from their voices across these domains. This dashboard is designed to help inform policymakers, organizations, and stakeholders about the priorities, concerns, and aspirations of today’s youth, ultimately guiding decisions and investments that impact their health and well-being. Explore the data, discover the stories behind the numbers, and join us in amplifying the voices of 1.8 billion young people worldwide. To learn more about the five domains and the campaign, visit www.1point8.org.',
    respondentsNoun: 'respondents',
    dashboardLinksFooter: [whatWomenWantLink, healthLiteracyLink, midwivesVoicesLink],
}
