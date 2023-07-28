'use client'

import { create } from 'zustand'
import { UseFormReturn } from 'react-hook-form'
import { TFilter } from '@schemas/filter'

export interface IFilterFormsState {
    form1?: UseFormReturn<TFilter, any>
    form2?: UseFormReturn<TFilter, any>
    setForm1: (form1: UseFormReturn<TFilter, any>) => void
    setForm2: (form2: UseFormReturn<TFilter, any>) => void
}

export const useFilterFormsStore = create<IFilterFormsState>((set, get) => ({
    form1: undefined,

    form2: undefined,

    setForm1: (form1) => {
        set(() => {
            return { form1 }
        })
    },

    setForm2: (form2) => {
        set(() => {
            return { form2 }
        })
    },
}))
