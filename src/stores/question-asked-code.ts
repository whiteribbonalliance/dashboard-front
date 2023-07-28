'use client'

import { create } from 'zustand'

export interface IQuestionAskedCodeState {
    questionAskedCode: string
    setQuestionAskedCode: (questionAskedCode: string) => void
}

export const useQuestionAskedCodeStore = create<IQuestionAskedCodeState>((set, get) => ({
    questionAskedCode: 'q1',

    setQuestionAskedCode: (questionAskedCode) => {
        set(() => {
            return { questionAskedCode }
        })
    },
}))
