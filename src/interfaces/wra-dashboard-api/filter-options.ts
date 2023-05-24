import { Option } from '@types'

export interface IFilterOptions {
    countries: Option[]
    response_topics: Option[]
    age_buckets: Option[]
    genders: Option[]
    professions: Option[]
    only_responses_from_categories: Option[]
    only_multi_word_phrases_containing_filter_term: Option[]
}
