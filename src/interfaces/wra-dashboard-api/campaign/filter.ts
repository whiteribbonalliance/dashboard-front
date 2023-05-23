export interface ICampaignFilter {
    countries: string[]
    regions: string[]
    age_buckets: string[]
    genders: string[]
    professions: string[]
    response_topics: string[]
    responses_from_categories_or_any: boolean
    keyword_filter: string
    keyword_exclude: string
    multi_word_phrases_filter_term_or_any: boolean
}
