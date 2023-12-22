import { notFound } from 'next/navigation'
import { getAllCampaignsConfigurations, getSettings } from '@services/dashboard-api'
import { Dashboard } from '@page-components/DashboardPage/Dashboard'
import { ICampaignConfiguration } from '@interfaces'

interface IDashboardProps {
    params: { lang: string; dashboard: string }
}

export const DashboardPage = async ({ params }: IDashboardProps) => {
    const { dashboard, lang } = params

    // Get configurations
    let campaignsConfigurations: ICampaignConfiguration[]
    try {
        campaignsConfigurations = await getAllCampaignsConfigurations()
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

    const settings = await getSettings()

    return (
        <Dashboard
            dashboard={dashboard}
            lang={lang}
            currentCampaignConfiguration={campaignConfiguration}
            allCampaignsConfigurations={campaignsConfigurations}
            settings={settings}
        />
    )
}
