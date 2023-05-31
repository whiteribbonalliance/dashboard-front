import { useQuery } from 'react-query'
import { ICampaign } from '@interfaces'
import { getCampaign } from '@services/wra-dashboard-api'
import { IFiltersState, useFiltersStore } from '@stores/filters'
import { useEffect } from 'react'
import { defaultFilterValues } from '@constants'
import _ from 'lodash'

// Campaign query
export const useCampaignQuery = (dashboard: string) => {
    const filters = useFiltersStore((state: IFiltersState) => state.filters)

    // If the filter has not changed from the default filter values then do not send it with the request
    const filter1 = _.isEqual(filters.filter1, defaultFilterValues) ? undefined : filters.filter1
    const filter2 = _.isEqual(filters.filter2, defaultFilterValues) ? undefined : filters.filter2

    const campaignQuery = useQuery<ICampaign>({
        queryKey: [`campaign-${dashboard}`],
        queryFn: () =>
            getCampaign(dashboard, {
                filter_1: filter1,
                filter_2: filter2,
            }),
        refetchOnWindowFocus: false,
    })

    // Refetch function
    const refetch = campaignQuery.refetch

    // Refetch campaign on filters change
    useEffect(() => {
        if (filters) {
            refetch().then()
        }
    }, [refetch, filters])

    return campaignQuery
}
