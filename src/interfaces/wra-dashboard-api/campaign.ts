import { IWordcloudWords } from './wordcloud-words'
import { ITopWords } from './top-words'
import { IHistogramData } from './histogram-data'

interface IResponsesSample {
    columns: [{ name: string; id: string; type: string }]
    data: any
}

interface IResponseBreakdownData {
    count: number
    description: string
}

interface ITopWordsAndPhrases {
    wordcloud_words: IWordcloudWords[]
    top_words: ITopWords[]
    two_word_phrases: ITopWords[]
    three_word_phrases: ITopWords[]
}

interface IHistogram {
    age: IHistogramData[]
    gender: IHistogramData[]
    profession: IHistogramData[]
    region: IHistogramData[]
    canonical_country: IHistogramData[]
}

interface IGenderData {
    name: string
    count: string
}

export interface IWorldBubbleMapsCoordinate {
    country_alpha2_code: string
    country_name: string
    color_id: 'color_1' | 'color_2'
    n: number
    lat: number
    lon: number
}

interface IWorldBubbleMapsCoordinates {
    coordinates_1: IWorldBubbleMapsCoordinate[]
    coordinates_2: IWorldBubbleMapsCoordinate[]
}

export interface ICampaign {
    responses_sample: IResponsesSample
    responses_breakdown: IResponseBreakdownData[]
    top_words_and_phrases: ITopWordsAndPhrases
    histogram: IHistogram
    genders_breakdown: IGenderData[]
    world_bubble_maps_coordinates: IWorldBubbleMapsCoordinates
    filter_1_description: string
    filter_2_description: string
    filter_1_respondents_count: number
    filter_2_respondents_count: number
    filter_1_average_age: string
    filter_2_average_age: string
    filters_are_identical: boolean
}
