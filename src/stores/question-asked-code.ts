'use client'

import { create } from 'zustand'
import { TQuestionCode } from '@types'

export interface IQuestionAskedCodeState {
    questionAskedCode: TQuestionCode
    setQuestionAskedCode: (questionAskedCode: TQuestionCode) => void
}

export const useQuestionAskedCodeStore = create<IQuestionAskedCodeState>((set, get) => ({
    questionAskedCode: 'q1',

    setQuestionAskedCode: (questionAskedCode) => {
        set(() => {
            return { questionAskedCode }
        })
    },
}))
