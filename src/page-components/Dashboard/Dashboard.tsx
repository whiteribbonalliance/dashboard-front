import { dashboards } from '@constants'
import { notFound } from 'next/navigation'
import { Title } from 'components/Title'
import React from 'react'
import { Subtext } from 'components/Subtext'
import { FiltersPanel } from '@components/FiltersPanel'
import { WhoThePeopleAreGraph } from 'graph-components/WhoThePeopleAreGraph'
import { DashboardName } from '@enums'
import { classNames } from '@utils'
import { ResponsesBreakdownGraph } from '@graph-components/ResponsesBreakdownGraph'
import { WorldBubbleMap } from 'graph-components/WorldBubbleMap'
import { ResponsesSampleTable } from '@graph-components/ResponsesSampleTable'
import { TopWordsAndPhrasesGraph } from '@graph-components/TopWordsAndPhrasesGraph'
import { GenderBreakdownGraph } from '@graph-components/GenderBreakdownGraph'
import { Dashboard as TDashboard } from '@types'

interface IDashboardProps {
    params: { lang: string; dashboard: TDashboard }
}

export const Dashboard = ({ params }: IDashboardProps) => {
    const { dashboard, lang } = params

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
                {/* @ts-expect-error Server Component */}
                <Title dashboard={dashboard} lang={lang} />
            </div>

            {/* Subtext */}
            <div className="mb-10 flex justify-center">
                {/* @ts-expect-error Server Component */}
                <Subtext dashboard={dashboard} lang={lang} />
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 items-start gap-x-[10%] xl:grid-cols-3">
                {/* Filters panel */}
                <section className="hidden xl:sticky xl:top-5 xl:col-span-1 xl:block">
                    <FiltersPanel dashboard={dashboard} lang={lang} />
                </section>

                {/* Graphs, table & maps */}
                <section className={classNames('col-span-2 grid grid-cols-1', boxesGapY)}>
                    {DashboardName.WHAT_YOUNG_PEOPLE_WANT === dashboard ? (
                        <>
                            <ResponsesBreakdownGraph dashboard={dashboard} lang={lang} />
                            <WorldBubbleMap dashboard={dashboard} lang={lang} />
                            <WhoThePeopleAreGraph dashboard={dashboard} lang={lang} />
                            <GenderBreakdownGraph dashboard={dashboard} lang={lang} />
                            <TopWordsAndPhrasesGraph dashboard={dashboard} lang={lang} />
                            <ResponsesSampleTable dashboard={dashboard} lang={lang} />
                        </>
                    ) : (
                        <>
                            <TopWordsAndPhrasesGraph dashboard={dashboard} lang={lang} />
                            <ResponsesSampleTable dashboard={dashboard} lang={lang} />
                            <WorldBubbleMap dashboard={dashboard} lang={lang} />
                            <ResponsesBreakdownGraph dashboard={dashboard} lang={lang} />
                            <WhoThePeopleAreGraph dashboard={dashboard} lang={lang} />
                        </>
                    )}
                </section>
            </div>
        </>
    )
}
