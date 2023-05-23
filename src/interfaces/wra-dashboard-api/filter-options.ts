import { ICountry } from './country'
import { IResponseTopic } from './response-topic'

export interface IFilterOptions {
    countries: ICountry[]
    response_topics: IResponseTopic[]
    age_buckets: string[]
    genders: string[]
    professions: string[]
}
