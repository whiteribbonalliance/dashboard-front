import { TQuestionCode } from '@types'
import { IDashboardLink } from './dashboard-link'

export interface IConfiguration {
    id: string
    campaignCode: string
    seoTitle: string
    seoMetaDescription: string
    respondentsNounSingular: string
    respondentsNounPlural: string
    showVideoLink: string
    questionsAskedCodes: TQuestionCode[]
    link: IDashboardLink
}
