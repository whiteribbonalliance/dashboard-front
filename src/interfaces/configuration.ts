import { IDashboardLink } from './dashboard-link'

export interface IConfiguration {
    id: string
    title: string
    campaignCode: string
    seoTitle: string
    seoMetaDescription: string
    respondentsNounSingular: string
    respondentsNounPlural: string
    showVideoLink: string
    link: IDashboardLink
}
