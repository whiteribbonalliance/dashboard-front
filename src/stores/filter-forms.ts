'use client'

import { create } from 'zustand'
import { UseFormReturn } from 'react-hook-form'
import { TFilter } from '@schemas/filter'

export interface IFilterFormsState {
    form1?: UseFormReturn<TFilter>
    form2?: UseFormReturn<TFilter>
    setForm1: (form1: UseFormReturn<TFilter>) => void
    setForm2: (form2: UseFormReturn<TFilter>) => void
}

export const useFilterFormsStore = create<IFilterFormsState>((set, get) => ({
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
