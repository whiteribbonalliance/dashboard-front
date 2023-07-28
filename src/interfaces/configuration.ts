import { IDashboardLink } from '@interfaces'
import { TQuestionCode } from '@types'

export interface IConfiguration {
    id: string
    campaignCode: string
    seoTitle: string
    seoMetaDescription: string
    respondentsNounSingular: string
    respondentsNounPlural: string
    dashboardLinksFooter: IDashboardLink[]
    showVideoLink: string
    questionsAskedCodes: TQuestionCode[]
}
