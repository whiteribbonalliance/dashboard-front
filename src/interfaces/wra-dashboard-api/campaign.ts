import { IWordcloudWords } from './wordcloud-words'
import { ITopWords } from './top-words'

interface IResponsesSample {
    columns: [{ name: string; id: string; type: string }]
    data: any
}

interface IResponsesBreakdown {
    count: number
    description: string
}

interface ITopWordsAndPhrases {
    wordcloud_words: IWordcloudWords[]
    top_words: ITopWords[]
    two_word_phrases: ITopWords[]
    three_word_phrases: ITopWords[]
}

export interface ICampaign {
    responses_sample: IResponsesSample
    responses_breakdown: IResponsesBreakdown[]
    top_words_and_phrases: ITopWordsAndPhrases
    filter_1_description: string
    filter_2_description: string
    filter_1_respondents_count: number
    filter_2_respondents_count: number
    filter_1_average_age: string
    filter_2_average_age: string
}
