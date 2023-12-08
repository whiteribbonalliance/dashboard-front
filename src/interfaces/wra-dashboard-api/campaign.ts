/*
MIT License

Copyright (c) 2023 White Ribbon Alliance. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import { IWordcloudWord } from './wordcloud-word'
import { ITopWord } from './top-words'
import { IHistogramData } from './histogram-data'

export interface IResponsesSample {
    columns: [{ name: string; id: string; type: string }]
    data: any
}

export interface IResponsesBreakdownData {
    count_1: number
    count_2: number
    value: string
    label: string
}

export interface IResponsesBreakdown {
    parent_categories: IResponsesBreakdownData[]
    sub_categories: IResponsesBreakdownData[]
    parent_or_sub_categories: IResponsesBreakdownData[]
}

export interface ITopWordsAndPhrases {
    wordcloud_words: IWordcloudWord[]
    top_words: ITopWord[]
    two_word_phrases: ITopWord[]
    three_word_phrases: ITopWord[]
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

export interface IGenderBreakdown {
    value: string
    label: string
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
    value: string
    label: string
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
