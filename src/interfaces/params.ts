import { TDashboard, TQuestionCode } from '@types'
import { TFilter } from '@schemas/filter'
import { Dispatch, SetStateAction } from 'react'

export interface IParams {
    dashboard: TDashboard
    lang: string
    filters: {
        filter1?: TFilter
        filter2?: TFilter
    }
    questionAskedCode: TQuestionCode
    responseYear: string
}
