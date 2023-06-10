import { dashboards } from '@constants'
import { notFound } from 'next/navigation'
import { Title } from 'components/Title'
import React from 'react'
import { Subtext } from 'components/Subtext'
import { FiltersPanel } from '@components/FiltersPanel'
import { ResponsesBreakdownGraph } from '@graph-components/ResponsesBreakdownGraph'
import { TopWordsAndPhrasesGraph } from '@graph-components/TopWordsAndPhrasesGraph'
import { ResponsesSampleTable } from 'graph-components/ResponsesSampleTable'
import { WorldBubbleMaps } from 'graph-components/WorldBubbleMaps'
import { WhoThePeopleAreGraph } from 'graph-components/WhoThePeopleAreGraph'
import { DashboardName } from '@enums'
import { GenderBreakdownGraph } from '@graph-components/GenderBreakdownGraph'
import { classNames } from '@utils'

interface IDashboardProps {
    params: { dashboard: string }
}

export const Dashboard = async ({ params }: IDashboardProps) => {
    const { dashboard } = params

    // Fire notFound() if subdomain/dashboard requested is not an existing dashboard
    if (!dashboards.some((d) => d === dashboard)) {
        notFound()
    }

    // Set gap-y between boxes
    let boxesGapY: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            boxesGapY = 'gap-y-[80px]'
            break
        default:
            boxesGapY = 'gap-y-[200px]'
    }

    return (
        <>
            {/* Title */}
            <div className="mb-3 flex justify-center xl:hidden">
                <Title dashboard={dashboard} />
            </div>

            {/* Subtext */}
            <div className="mb-10 flex justify-center">
                <Subtext dashboard={dashboard} />
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 items-start gap-x-[10%] xl:grid-cols-3">
                {/* Filters panel */}
                <section className="hidden xl:sticky xl:top-5 xl:col-span-1 xl:block">
                    <FiltersPanel dashboard={dashboard} />
                </section>

                {/* Graphs, table & map */}
                <section className={classNames('col-span-2 grid grid-cols-1', boxesGapY)}>
                    {DashboardName.WHAT_YOUNG_PEOPLE_WANT === dashboard ? (
                        <>
                            <ResponsesBreakdownGraph dashboard={dashboard} />
                            <WorldBubbleMaps dashboard={dashboard} />
                            <WhoThePeopleAreGraph dashboard={dashboard} />
                            <GenderBreakdownGraph dashboard={dashboard} />
                            <TopWordsAndPhrasesGraph dashboard={dashboard} />
                            <ResponsesSampleTable dashboard={dashboard} />
                        </>
                    ) : (
                        <>
                            <TopWordsAndPhrasesGraph dashboard={dashboard} />
                            <ResponsesSampleTable dashboard={dashboard} />
                            <WorldBubbleMaps dashboard={dashboard} />
                            <ResponsesBreakdownGraph dashboard={dashboard} />
                            <WhoThePeopleAreGraph dashboard={dashboard} />
                        </>
                    )}
                </section>
            </div>
        </>
    )
}
