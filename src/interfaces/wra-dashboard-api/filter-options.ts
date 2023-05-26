import { Option } from '@types'

export interface ICountryRegionOption {
    country_alpha2_code: string
    options: Option[]
}

export interface IFilterOptions {
    countries: Option[]
    country_regions: ICountryRegionOption[]
    response_topics: Option[]
    ages: Option[]
    genders: Option[]
    professions: Option[]
    only_responses_from_categories: Option[]
    only_multi_word_phrases_containing_filter_term: Option[]
}
