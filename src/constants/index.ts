import { DashboardCode } from '@enums'
import { IDashboardLink } from '@interfaces'

export const dashboards = [
    DashboardCode.WHAT_YOUNG_PEOPLE_WANT,
    DashboardCode.WHAT_WOMEN_WANT,
    DashboardCode.MIDWIVES_VOICES,
]

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
