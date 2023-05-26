import { IDashboardLink } from '@interfaces'

export interface IConfiguration {
    id: string
    title: string
    seoTitle: string
    seoMetaDescription: string
    subtext: string
    respondentsNoun: string
    dashboardLinksFooter: IDashboardLink[]
    questionAsked: string
    showVideoLink: string
}
