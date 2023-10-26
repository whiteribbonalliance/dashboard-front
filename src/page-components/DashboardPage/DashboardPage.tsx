import { dashboards } from '@constants'
import { notFound } from 'next/navigation'
import React from 'react'
import { TDashboard as TDashboard } from '@types'
import { Dashboard } from '@page-components/DashboardPage/Dashboard'

interface IDashboardProps {
    params: { lang: string; dashboard: TDashboard }
}

export const DashboardPage = ({ params }: IDashboardProps) => {
    const { dashboard, lang } = params

    // Fire notFound() if subdomain/dashboard requested is not an existing dashboard
    if (!dashboards.some((d) => d === dashboard)) {
        notFound()
    }

    // Any data that needs to be fetched server side can be done here and passed to the Dashboard component
    return <Dashboard dashboard={dashboard} lang={lang} />
}
