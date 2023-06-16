import { IDashboardLink } from '@interfaces'

export interface IConfiguration {
    id: string
    title: string
    seoTitle: string
    seoMetaDescription: string
    respondentsNounSingular: string
    respondentsNounPlural: string
    dashboardLinksFooter: IDashboardLink[]
    showVideoLink: string
}
