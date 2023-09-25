'use client'

import { create } from 'zustand'

export interface IResponseYearState {
    responseYear: string
    setResponseYear: (responseYear: string) => void
}

export const useResponseYearStore = create<IResponseYearState>((set, get) => ({
    responseYear: '',

    setResponseYear: (responseYear) => {
        set(() => {
            return { responseYear }
        })
    },
}))
