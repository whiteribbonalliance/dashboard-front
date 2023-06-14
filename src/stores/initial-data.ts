'use client'

import { create } from 'zustand'
import { IInitialData } from '@interfaces'

export interface IInitialDataState {
    initialData?: IInitialData
    setInitialData: (initialData: IInitialData) => void
}

export const useInitialDataStore = create<IInitialDataState>((set, get) => ({
    initialData: undefined,

    setInitialData: (initialData) => {
        set(() => {
            return { initialData }
        })
    },
}))
