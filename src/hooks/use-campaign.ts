import { useQuery } from 'react-query'
import { ICampaign } from '@interfaces'
import { getCampaign } from '@services/wra-dashboard-api'
import { IFiltersState, useFiltersStore } from '@stores/filters'
import { useEffect } from 'react'

// Campaign query
export const useCampaignQuery = (dashboard: string) => {
    const filters = useFiltersStore((state: IFiltersState) => state.filters)

    const campaignQuery = useQuery<ICampaign>({
        queryKey: [`campaign-${dashboard}`],
        queryFn: () =>
            getCampaign(dashboard, {
                filter_1: filters.filter1,
                filter_2: filters.filter2,
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
