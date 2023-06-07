import { Option } from '@types'

export interface ICountryRegionOption {
    country_alpha2_code: string
    options: Option<string>[]
}

export interface IFilterOptions {
    countries: Option<string>[]
    country_regions: ICountryRegionOption[]
    response_topics: Option<string>[]
    ages: Option<string>[]
    genders: Option<string>[]
    professions: Option<string>[]
    only_responses_from_categories: Option<boolean>[]
    only_multi_word_phrases_containing_filter_term: Option<boolean>[]
}
