'use client'

import { create } from 'zustand'
import { defaultFilterValues } from '@constants'
import { Filter } from '@schemas/filter'

interface IFilters {
    filter1: Filter
    filter2: Filter
}

export interface IFiltersState {
    filters: IFilters
    setFilters: (filters: IFilters) => void
}

export const useFiltersStore = create<IFiltersState>((set, get) => ({
    filters: { filter1: defaultFilterValues, filter2: defaultFilterValues },

    setFilters: (filters) => {
        set(() => {
            return { filters }
        })
    },
}))
