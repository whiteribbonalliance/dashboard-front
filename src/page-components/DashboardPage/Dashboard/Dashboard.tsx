'use client'

import { Header } from '@components/Header'
import { Title } from '@components/Title'
import { Subtext } from '@components/Subtext'
import { FiltersPanel } from '@components/FiltersPanel'
import { classNames } from '@utils'
import { Graphs } from '@components/Graphs'
import { Footer } from '@components/Footer'
import React, { useEffect } from 'react'
import { TDashboard } from '@types'
import { DashboardName } from '@enums'
import { useActiveDashboardStore } from '@stores/active-dashboard'
import { useShowSelectActiveDashboardStore } from '@stores/show-select-active-dashboard'

interface IDashboardProps {
    dashboard: TDashboard
    lang: string
}

export const Dashboard = ({ dashboard, lang }: IDashboardProps) => {
    const activeDashboard = useActiveDashboardStore((state) => state.activeDashboard)
    const setActiveDashboard = useActiveDashboardStore((state) => state.setActiveDashboard)
    const setShowSelectActiveDashboard = useShowSelectActiveDashboardStore(
        (state) => state.setShowSelectActiveDashboard
    )

    // When activeDashboard is changed, this component will change the current displayed dashboard
    useEffect(() => {
        setActiveDashboard(dashboard)
        if (dashboard === DashboardName.ALL_CAMPAIGNS) {
            setShowSelectActiveDashboard(true)
        } else {
            setShowSelectActiveDashboard(false)
        }
    }, [dashboard, setActiveDashboard, setShowSelectActiveDashboard])

    // Set gap-y between boxes
    let boxesGapY: string
    switch (activeDashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            boxesGapY = 'gap-y-[80px]'
            break
        default:
            boxesGapY = 'gap-y-[200px]'
    }

    // Set layout classes
    let layoutClasses: string
    switch (activeDashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            layoutClasses =
                'font-noto-sans-regular text-base text-pmnchColors-font selection:bg-pmnchColors-primary selection:text-white'
            break
        default:
            layoutClasses =
                'font-open-sans text-base text-defaultColors-font selection:bg-defaultColors-tertiary selection:text-white'
    }

    if (!activeDashboard) return null

    return (
        <div className={classNames(layoutClasses)}>
            {/* Header */}
            <Header dashboard={activeDashboard} lang={lang} />

            {/* Main */}
            <main className="mx-7 my-7">
                {/* Title */}
                <div className="mb-3 flex justify-center xl:hidden">
                    <Title dashboard={activeDashboard} lang={lang} />
                </div>

                {/* Subtext */}
                <div className="mb-10 flex justify-center">
                    <Subtext dashboard={activeDashboard} lang={lang} />
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 items-start gap-x-[10%] xl:grid-cols-3">
                    {/* Filters panel */}
                    <section className="hidden xl:sticky xl:top-5 xl:col-span-1 xl:block">
                        <FiltersPanel dashboard={activeDashboard} lang={lang} />
                    </section>

                    {/* Graphs */}
                    <section className={classNames('col-span-2 grid grid-cols-1', boxesGapY)}>
                        <Graphs dashboard={activeDashboard} lang={lang} />
                    </section>
                </div>
            </main>

            {/* Footer */}
            <Footer dashboard={activeDashboard} lang={lang} />
        </div>
    )
}
