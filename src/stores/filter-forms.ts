'use client'

import { create } from 'zustand'
import { UseFormReturn } from 'react-hook-form'
import { Filter } from '@schemas/filter'

export interface IFilterFormsState {
    form1?: UseFormReturn<Filter, any>
    form2?: UseFormReturn<Filter, any>
    setForm1: (form1: UseFormReturn<Filter, any>) => void
    setForm2: (form2: UseFormReturn<Filter, any>) => void
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
