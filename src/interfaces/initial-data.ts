import { ICampaign } from './wra-dashboard-api/campaign'
import { IFilterOptions } from './wra-dashboard-api/filter-options'
import { TOption } from '@types'

export interface IInitialData {
    campaign?: ICampaign | undefined
    filterOptions?: IFilterOptions | undefined
    whoThePeopleWareOptions?: TOption<string>[] | undefined
}
