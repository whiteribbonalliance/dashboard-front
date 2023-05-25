import { useQuery } from 'react-query'
import { ICampaign } from '@interfaces'
import { getCampaign } from '@services/wra-dashboard-api/api'
import { IFiltersState, useFiltersStore } from '@stores/filters'
import { useEffect } from 'react'

// Campaign query
export const useCampaignQuery = (dashboard: string) => {
    const filters = useFiltersStore((state: IFiltersState) => state.filters)

    // Copy filters
    const filter1 = { ...filters.filter1 }
    const filter2 = { ...filters.filter2 }

    // Remove alpha2 country code from region e.g. `ZW:Harare Province` -> `Harare Province`
    filter1.regions = filter1.regions.map((region) => region.substring(3))
    filter2.regions = filter2.regions.map((region) => region.substring(3))

    const campaignQuery = useQuery<ICampaign>({
        queryKey: ['campaign'],
        queryFn: () =>
            getCampaign(dashboard, {
                filter_1: filter1,
                filter_2: filter2,
            }),
        refetchOnWindowFocus: false,
        onSuccess: () => {},
        onError: () => {},
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
