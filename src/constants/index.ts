import { Dashboards } from '@enums'
import { IDashboardLink } from '@interfaces'

export const dashboards = [Dashboards.WHAT_YOUNG_PEOPLE_WANT, Dashboards.WHAT_WOMEN_WANT, Dashboards.MIDWIVES_VOICES]

export const seoMainTitle = 'White Ribbon Alliance'

export const whatWomenWantLink: IDashboardLink = {
    id: 'whatwomenwant',
    title: 'What Women Want',
    link: 'https://whatwomenwant.whiteribbonalliance.org',
}

export const healthLiteracyLink: IDashboardLink = {
    id: 'healthliteracy',
    title: 'Health Literacy',
    link: 'https://wwwliteracydashboard.whiteribbonalliance.org',
}

export const midwivesVoicesLink: IDashboardLink = {
    id: 'midwivesvoices',
    title: 'What Midwives Want',
    link: 'https://midwivesvoices.whiteribbonalliance.org',
}
