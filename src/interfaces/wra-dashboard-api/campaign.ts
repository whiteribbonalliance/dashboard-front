interface IResponsesSample {
    columns: [{ name: string; id: string; type: string }]
    data: any
}

export interface ICampaign {
    responses_sample: IResponsesSample
}
