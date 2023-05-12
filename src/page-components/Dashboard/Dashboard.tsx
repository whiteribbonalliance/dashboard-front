import { dashboards } from '@constants'
import { notFound } from 'next/navigation'
import { NextPage } from 'next'

interface IDashboardProps {
    params: { dashboard: string }
}

export const Dashboard: NextPage<IDashboardProps> = ({ params }: IDashboardProps) => {
    const { dashboard } = params

    // Fire notFound() if subdomain/dashboard requested is not an existing dashboard
    if (!dashboards.some((d) => d === dashboard)) {
        notFound()
    }

    return (
        <div className="mx-3 my-5 text-xl">
            Active dashboard: <span className="font-bold">{dashboard}</span>
        </div>
    )
}
