interface IResponsesSample {
    columns: [{ name: string; id: string; type: string }]
    data: any
}

interface IResponsesBreakdown {
    count: number
    description: string
}

export interface ICampaign {
    responses_sample: IResponsesSample
    responses_breakdown: IResponsesBreakdown[]
}
