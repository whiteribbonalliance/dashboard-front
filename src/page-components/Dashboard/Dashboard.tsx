import { dashboards } from '@constants'
import { notFound } from 'next/navigation'

interface IDashboardProps {
    params: { dashboard: string }
}

export const Dashboard = ({ params }: IDashboardProps) => {
    const { dashboard } = params

    // Fire notFound() if subdomain is not an existing dashboard
    if (!dashboards.some((d) => d === dashboard)) {
        notFound()
    }

    return <div>{dashboard}</div>
}
