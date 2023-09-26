'use client'

import { create } from 'zustand'
import { ICountry } from '@interfaces'

export interface ICountriesState {
    countries: ICountry[]
    setCountries: (countries: ICountry[]) => void
}

export const useCountriesStore = create<ICountriesState>((set, get) => ({
    countries: [],

    setCountries: (countries) => {
        set(() => {
            return { countries }
        })
    },
}))
