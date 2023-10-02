import { IWordcloudWord } from './wordcloud-word'
import { ITopWords } from './top-words'
import { IHistogramData } from './histogram-data'

export interface IResponsesSample {
    columns: [{ name: string; id: string; type: string }]
    data: any
}

export interface IResponsesBreakdownData {
    count_1: number
    count_2: number
    code: string
    description: string
}

export interface IResponsesBreakdown {
    parent_categories: IResponsesBreakdownData[]
    sub_categories: IResponsesBreakdownData[]
    parent_or_sub_categories: IResponsesBreakdownData[]
}

export interface ITopWordsAndPhrases {
    wordcloud_words: IWordcloudWord[]
    top_words: ITopWords[]
    two_word_phrases: ITopWords[]
    three_word_phrases: ITopWords[]
}

interface IHistogram {
    ages: IHistogramData[]
    age_buckets: IHistogramData[]
    age_buckets_default: IHistogramData[]
    genders: IHistogramData[]
    professions: IHistogramData[]
    regions: IHistogramData[]
    canonical_countries: IHistogramData[]
}

interface IGenderBreakdown {
    name: string
    count: string
}

export interface IWorldBubbleMapsCoordinate {
    location_code: string
    location_name: string
    n: number
    lat: number
    lon: number
}

interface IWorldBubbleMapsCoordinates {
    coordinates_1: IWorldBubbleMapsCoordinate[]
    coordinates_2: IWorldBubbleMapsCoordinate[]
}

export interface ILivingSettingBreakdown {
    name: string
    count_1: number
    count_2: number
}

export interface ICampaign {
    campaign_code: string
    q_code: string
    all_q_codes: string[]
    included_response_years: string[]
    all_response_years: string[]
    responses_sample: IResponsesSample
    responses_breakdown: IResponsesBreakdown
    living_settings_breakdown: ILivingSettingBreakdown[]
    top_words_and_phrases: ITopWordsAndPhrases
    histogram: IHistogram
    genders_breakdown: IGenderBreakdown[]
    world_bubble_maps_coordinates: IWorldBubbleMapsCoordinates
    filter_1_description: string
    filter_2_description: string
    filter_1_respondents_count: number
    filter_2_respondents_count: number
    filter_1_average_age: string
    filter_2_average_age: string
    filter_1_average_age_bucket: string
    filter_2_average_age_bucket: string
    filters_are_identical: boolean
}
