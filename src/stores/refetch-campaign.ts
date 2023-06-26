'use client'

import { create } from 'zustand'

export interface IRefetchCampaignState {
    refetchCampaign?: () => void
    setRefetchCampaign: (refetchCampaign: () => void) => void
}

export const useRefetchCampaignStore = create<IRefetchCampaignState>((set, get) => ({
    refetchCampaign: undefined,

    setRefetchCampaign: (refetchCampaign) => {
        set(() => {
            return { refetchCampaign }
        })
    },
}))
