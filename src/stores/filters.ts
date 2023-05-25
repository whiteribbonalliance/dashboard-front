import { create } from 'zustand'
import { IFilter } from '@interfaces'
import { defaultFilterValues } from '@constants'

interface IFilters {
    filter1: IFilter
    filter2: IFilter
}

export interface IFiltersState {
    filters: IFilters
    setFilters: (filters: IFilters) => void
}

export const useFiltersStore = create<IFiltersState>((set, get) => ({
    filters: { filter1: defaultFilterValues, filter2: defaultFilterValues },

    setFilters: (filters: IFilters) => {
        set(() => {
            return { filters }
        })
    },
}))
