'use client'

import { Header } from '@components/Header'
import { Title } from '@components/Title'
import { Subtext } from '@components/Subtext'
import { FiltersPanel } from '@components/FiltersPanel'
import { classNames } from '@utils'
import { GraphsWrapper } from 'components/GraphsWrapper'
import { Footer } from '@components/Footer'
import React, { useEffect, useState } from 'react'
import { LegacyDashboardName } from '@enums'
import { useShowSelectActiveDashboardStore } from '@stores/show-select-active-dashboard'
import { ICampaignConfiguration, IDataLoading, IParams, ISettings } from '@interfaces'
import { ParamsContext } from '@contexts/params'
import { getDefaultFilterValues } from '@schemas/filter'
import { ConfigurationsContext } from '@contexts/configurations'
import { SettingsContext } from '@contexts/settings'
import { useQuery } from 'react-query'
import { getDataLoadingStatus } from '@services/dashboard-api'

interface IDashboardProps {
    dashboard: string
    lang: string
    currentCampaignConfiguration: ICampaignConfiguration
    allCampaignsConfigurations: ICampaignConfiguration[]
    settings: ISettings
}

export const Dashboard = ({
    dashboard,
    lang,
    currentCampaignConfiguration,
    allCampaignsConfigurations,
    settings,
}: IDashboardProps) => {
    const defaultFilterValues = getDefaultFilterValues(dashboard)

    const [params, setParams] = useState<IParams>({
        dashboard: dashboard,
        config: currentCampaignConfiguration,
        lang: lang,
        filters: { filter1: defaultFilterValues, filter2: defaultFilterValues },
        questionAskedCode: 'q1',
        responseYear: '',
    })

    const setShowSelectActiveDashboard = useShowSelectActiveDashboardStore(
        (state) => state.setShowSelectActiveDashboard
    )

    // Data loading status query
    const dataLoadingStatusQuery = useQuery<IDataLoading>({
        queryKey: ['data-loading-status'],
        queryFn: () => {
            return getDataLoadingStatus()
        },
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })

    // Set show select active dashboard
    useEffect(() => {
        if (dashboard === LegacyDashboardName.ALL_CAMPAIGNS) {
            setShowSelectActiveDashboard(true)
        } else {
            setShowSelectActiveDashboard(false)
        }
    }, [dashboard, setShowSelectActiveDashboard])

    // Set gap-y between boxes
    let boxesGapY: string
    switch (params.dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            boxesGapY = 'gap-y-[80px]'
            break
        default:
            boxesGapY = 'gap-y-[200px]'
    }

    // Set layout classes
    let layoutClasses: string
    switch (params.dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            layoutClasses =
                'font-noto-sans-regular text-base text-pmnchColors-font selection:bg-pmnchColors-primary selection:text-white'
            break
        default:
            layoutClasses =
                'font-open-sans text-base text-defaultColors-font selection:bg-defaultColors-tertiary selection:text-white'
    }

    if (!dataLoadingStatusQuery.data) {
        return null
    }

    return (
        <div className={classNames(layoutClasses, 'flex h-screen flex-col')}>
            <SettingsContext.Provider value={{ settings }}>
                <ConfigurationsContext.Provider value={{ allCampaignsConfigurations }}>
                    <ParamsContext.Provider value={{ params, setParams }}>
                        {/* Header */}
                        <Header hideFiltersPanel={!dataLoadingStatusQuery.data.initial_loading_complete} />

                        {/* Main */}
                        <main className="mx-7 my-7">
                            {/* Title */}
                            <div className="mb-3 flex justify-center xl:hidden">
                                <Title />
                            </div>

                            {/* Subtext */}
                            <div className="mb-10 flex justify-center">
                                <Subtext />
                            </div>

                            {/* Starting up */}
                            {!dataLoadingStatusQuery.data.initial_loading_complete && (
                                <div className="my-10 text-lg font-bold">Waiting for application startup...</div>
                            )}

                            {/* Content */}
                            {dataLoadingStatusQuery.data.initial_loading_complete && (
                                <div className="grid grid-cols-1 items-start gap-x-[10%] xl:grid-cols-3">
                                    {/* Filters panel */}
                                    <section className="hidden xl:sticky xl:top-5 xl:col-span-1 xl:block">
                                        <FiltersPanel />
                                    </section>

                                    {/* Graphs */}
                                    <section className={classNames('col-span-2 grid grid-cols-1', boxesGapY)}>
                                        <GraphsWrapper />
                                    </section>
                                </div>
                            )}
                        </main>

                        {/* Footer */}
                        <Footer />
                    </ParamsContext.Provider>
                </ConfigurationsContext.Provider>
            </SettingsContext.Provider>
        </div>
    )
}
