import { IDashboardLink } from '@interfaces/dashboard-link'

export interface IConfiguration {
    id: string
    title: string
    seoTitle: string
    seoMetaDescription: string
    subtext: string
    respondentsNoun: string
    dashboardLinksFooter: IDashboardLink[]
}
