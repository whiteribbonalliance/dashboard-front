import { notFound } from 'next/navigation'
import { getCampaignsConfigurations, getDataLoadingStatus, getSettings } from '@services/dashboard-api'
import { Dashboard } from '@page-components/DashboardPage/Dashboard'
import { ICampaignConfiguration, IDataLoadingStatus } from '@interfaces'
import { Subtext } from '@components/Subtext'

interface IDashboardProps {
    params: { lang: string; dashboard: string }
}

export const DashboardPage = async ({ params }: IDashboardProps) => {
    const { dashboard, lang } = params

    // Get configurations
    let campaignsConfigurations: ICampaignConfiguration[]
    try {
        campaignsConfigurations = await getCampaignsConfigurations(lang)
    } catch (error) {
        campaignsConfigurations = []
    }

    // Get configuration
    const campaignConfiguration = campaignsConfigurations.find((config) => config.dashboard_path === dashboard)

    // Dashboard paths
    const dashboardPaths = campaignsConfigurations.map((config) => config.dashboard_path)

    // Fire notFound() if subdomain/dashboard requested is not an existing dashboard
    if (!dashboardPaths.some((path) => path === dashboard)) {
        notFound()
    }

    // Fire notFound() if there is no campaign configuration
    if (!campaignConfiguration) {
        notFound()
    }

    // Get data loading status
    let dataLoadingStatus: IDataLoadingStatus
    try {
        dataLoadingStatus = await getDataLoadingStatus()
    } catch (error) {
        dataLoadingStatus = {
            is_loading: false,
            initial_loading_complete: true,
        }
    }

    // Settings
    const settings = await getSettings()

    // Subtext
    const subtext = (
        // @ts-expect-error server component
        <Subtext
            subtext={campaignConfiguration.campaign_subtext}
            dashboard={dashboard}
            lang={lang}
            campaignCode={campaignConfiguration.campaign_code}
        />
    )

    return (
        <Dashboard
            dashboard={dashboard}
            lang={lang}
            currentCampaignConfiguration={campaignConfiguration}
            allCampaignsConfigurations={campaignsConfigurations}
            settings={settings}
            dataLoadingStatus={dataLoadingStatus}
            subtext={subtext}
        />
    )
}
