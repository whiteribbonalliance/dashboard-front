'use client'

import { create } from 'zustand'
import { TDashboard } from '@types'

export interface IActiveDashboardState {
    activeDashboard?: TDashboard
    setActiveDashboard: (allCampaignsActiveDashboard: TDashboard) => void
}

export const useActiveDashboardStore = create<IActiveDashboardState>((set, get) => ({
    activeDashboard: undefined,

    setActiveDashboard: (activeDashboard) => {
        set(() => {
            return { activeDashboard }
        })
    },
}))
