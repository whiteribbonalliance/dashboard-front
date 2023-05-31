import { IWordcloudWords } from './wordcloud-words'

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
}

export interface ICampaign {
    responses_sample: IResponsesSample
    responses_breakdown: IResponsesBreakdown[]
    top_words_and_phrases: ITopWordsAndPhrases
}
