'use client'

import { createContext } from 'react'

interface IDashboardContextProps {
    dashboard: string
}

export const DashboardContext = createContext<IDashboardContextProps>(undefined as any)
