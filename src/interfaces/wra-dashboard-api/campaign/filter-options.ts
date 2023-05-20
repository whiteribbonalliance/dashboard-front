import { ICampaignCountry } from './country'
import { ICampaignResponseTopic } from './response-topic'

export interface ICampaignFilterOptions {
    countries: ICampaignCountry[]
    response_topics: ICampaignResponseTopic[]
}
