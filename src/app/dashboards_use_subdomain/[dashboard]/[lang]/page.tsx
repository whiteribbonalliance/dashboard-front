import { DashboardPage } from 'page-components/DashboardPage'
import { getAllCampaignsConfigurations } from '@services/dashboard-api'

export default DashboardPage

interface IGenerateMetadataProps {
    params: { dashboard: string }
}

// The dashboards will be created using the params returned by this function
export async function generateStaticParams() {
    // Get configurations
    const campaignsConfigurations = await getAllCampaignsConfigurations()

    // Generate static params for dashboards
    return campaignsConfigurations.map((config) => ({
        dashboard: config.dashboard_path,
    }))
}

// Set page title and description
export async function generateMetadata({ params }: IGenerateMetadataProps) {
    const { dashboard } = params

    // Get configurations
    const campaignsConfigurations = await getAllCampaignsConfigurations()

    // Get configurations
    const campaignConfiguration = campaignsConfigurations.find((config) => config.dashboard_path === dashboard)

    return {
        title: campaignConfiguration?.seo_title || '',
        description: campaignConfiguration?.seo_meta_description || '',
    }
}
