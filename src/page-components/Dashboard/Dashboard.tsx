import { dashboards } from '@constants'
import { notFound } from 'next/navigation'
import { Title } from 'components/Title'
import React from 'react'
import { Subtext } from 'components/Subtext'
import { FiltersPanel } from '@components/FiltersPanel'
import { Box } from '@components/Box'

interface IDashboardProps {
    params: { dashboard: string }
}

export const Dashboard = async ({ params }: IDashboardProps) => {
    const { dashboard } = params

    // Fire notFound() if subdomain/dashboard requested is not an existing dashboard
    if (!dashboards.some((d) => d === dashboard)) {
        notFound()
    }

    return (
        <div className="mx-7 mb-12 mt-7 text-xl">
            {/* Title */}
            <div className="mb-3 flex justify-center xl:hidden">
                <Title dashboard={dashboard} />
            </div>

            {/* Subtext */}
            <div className="mb-10 flex justify-center">
                <Subtext dashboard={dashboard} />
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 gap-x-[10%] xl:grid-cols-2">
                {/* Filters panel */}
                <div className="hidden xl:sticky xl:top-5 xl:block xl:h-fit">
                    <FiltersPanel dashboard={dashboard} />
                </div>

                {/* Graphs */}
                <div className="grid grid-cols-1 gap-y-[200px]">
                    <Box>123</Box>
                    <Box>123</Box>
                    <Box>123</Box>
                    <Box>123</Box>
                    <Box>123</Box>
                </div>
            </div>
        </div>
    )
}
