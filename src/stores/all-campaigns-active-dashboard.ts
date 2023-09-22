'use client'

import { create } from 'zustand'
import { TDashboard } from '@types'
import { DashboardName } from '@enums'

export interface IAllCampaignActiveDashboardState {
    allCampaignsActiveDashboard: TDashboard
    setAllCampaignsActiveDashboard: (allCampaignsActiveDashboard: TDashboard) => void
}

export const useAllCampaignsActiveDashboardStore = create<IAllCampaignActiveDashboardState>((set, get) => ({
    allCampaignsActiveDashboard: DashboardName.ALL_CAMPAIGNS,

    setAllCampaignsActiveDashboard: (allCampaignsActiveDashboard) => {
        set(() => {
            return { allCampaignsActiveDashboard }
        })
    },
}))
