import { TOption } from '@types'

export interface ICountryRegionOption {
    country_alpha2_code: string
    options: TOption<string>[]
}

export interface ICountryRegionProvinceOption {
    country_alpha2_code: string
    options: TOption<string>[]
}

export interface IFilterOptions {
    countries: TOption<string>[]
    country_regions: ICountryRegionOption[]
    country_provinces: ICountryRegionProvinceOption[]
    response_topics: TOption<string>[]
    ages: TOption<string>[]
    age_buckets: TOption<string>[]
    genders: TOption<string>[]
    professions: TOption<string>[]
    only_responses_from_categories: TOption<boolean>[]
    only_multi_word_phrases_containing_filter_term: TOption<boolean>[]
}
