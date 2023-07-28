'use client'

import { create } from 'zustand'
import { defaultFilterValues } from '@constants'
import { TFilter } from '@schemas/filter'

interface IFilters {
    filter1: TFilter
    filter2: TFilter
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
