import { DashboardName } from '@enums'
import { IDashboardLink } from '@interfaces'
import { Filter } from '@schemas/filter'

export const dashboards = [
    DashboardName.WHAT_YOUNG_PEOPLE_WANT,
    DashboardName.WHAT_WOMEN_WANT,
    DashboardName.MIDWIVES_VOICES,
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

export const defaultFilterValues: Filter = {
    countries: [],
    regions: [],
    ages: [],
    genders: [],
    professions: [],
    response_topics: [],
    only_responses_from_categories: false,
    only_multi_word_phrases_containing_filter_term: false,
    keyword_filter: '',
    keyword_exclude: '',
}
