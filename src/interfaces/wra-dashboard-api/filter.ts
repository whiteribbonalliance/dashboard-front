export interface IFilter {
    countries: string[]
    regions: string[]
    age_buckets: string[]
    genders: string[]
    professions: string[]
    response_topics: string[]
    only_responses_from_categories: boolean
    only_multi_word_phrases_containing_filter_term: boolean
    keyword_filter: string
    keyword_exclude: string
}
