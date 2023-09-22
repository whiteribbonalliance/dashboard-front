'use client'

import { create } from 'zustand'

export interface IShowSelectActiveDashboardState {
    showSelectActiveDashboard: boolean
    setShowSelectActiveDashboard: (showSelectActiveDashboard: boolean) => void
}

export const useShowSelectActiveDashboardStore = create<IShowSelectActiveDashboardState>((set, get) => ({
    showSelectActiveDashboard: false,

    setShowSelectActiveDashboard: (showSelectActiveDashboard) => {
        set(() => {
            return { showSelectActiveDashboard }
        })
    },
}))
