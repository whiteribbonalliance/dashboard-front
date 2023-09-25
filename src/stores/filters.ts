'use client'

import { create } from 'zustand'
import { TFilter } from '@schemas/filter'
import { getDefaultFilterValues } from '@utils'

interface IFilters {
    filter1: TFilter
    filter2: TFilter
}

export interface IFiltersState {
    filters: IFilters
    setFilters: (filters: IFilters) => void
}

const defaultFilterValues = getDefaultFilterValues()
export const useFiltersStore = create<IFiltersState>((set, get) => ({
    filters: { filter1: defaultFilterValues, filter2: defaultFilterValues },

    setFilters: (filters) => {
        set(() => {
            return { filters }
        })
    },
}))
