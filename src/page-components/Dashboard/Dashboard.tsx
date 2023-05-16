import { dashboards } from '@constants'
import { notFound } from 'next/navigation'
import { NextPage } from 'next'
import { Title } from '@components/server/Title'
import React from 'react'
import { SubText } from '@components/server/SubText'

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
        <div className="mx-7 my-5 text-xl">
            {/* Title */}
            <div className="mb-3 flex justify-center xl:hidden">
                <Title dashboard={dashboard} />
            </div>

            {/* Sub text */}
            <div className="flex justify-center">
                <SubText dashboard={dashboard} />
            </div>
        </div>
    )
}
