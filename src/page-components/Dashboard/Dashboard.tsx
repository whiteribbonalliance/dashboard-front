import { dashboards } from '@constants'
import { notFound } from 'next/navigation'
import { Dashboard } from '@page-components/Dashboard'

interface IDashboardProps {
    params: { dashboard: string }
}

export const DashboardWrapper = ({ params }: IDashboardProps) => {
    const { dashboard } = params

    // Fire notFound() if subdomain is not an existing dashboard
    if (!dashboards.some((d) => d === dashboard)) {
        notFound()
    }

    return <Dashboard />
}
