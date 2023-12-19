import { getAllCampaignsConfigurations, getSettings } from '@services/dashboard-api'
import { revalidatePath } from 'next/cache'
import { DashboardPage } from '@page-components/DashboardPage'
import { languagesAzure, languagesGoogle } from '@constants'

export default DashboardPage

export const dynamic = 'error'

interface IParams {
    params: { lang: string; dashboard: string }
}

// The dashboards will be created using the params returned by this function
export async function generateStaticParams() {
    // Purge cache to re-fetch it during build
    revalidatePath('/[lang]/[dashboard]', 'page')

    // Check if translations is enabled in the back-end
    let translationsEnabled = true
    try {
        const settings = await getSettings()
        if (!settings.translations_enabled) {
            translationsEnabled = false
        }
    } catch (err) {}

    // Languages
    let languages: string[]
    if (!translationsEnabled) {
        languages = ['en']
    } else {
        const ONLY_PMNCH = process.env.ONLY_PMNCH.toLowerCase() === 'true'
        if (ONLY_PMNCH) {
            languages = languagesAzure.map((l) => l.code)
        } else {
            languages = languagesGoogle.map((l) => l.code)
        }
    }

    // Get campaigns configurations
    const campaignsConfigurations = await getAllCampaignsConfigurations()

    // Get all dashboard paths
    const dashboards = campaignsConfigurations.map((config) => config.dashboard_path)

    // Generate static params
    const params = []
    for (const lang of languages) {
        for (const dashboard of dashboards) {
            params.push({ lang, dashboard })
        }
    }

    return params
}

// Set page title and description
export async function generateMetadata({ params }: IParams) {
    const { dashboard } = params

    // Get configurations
    const campaignsConfigurations = await getAllCampaignsConfigurations()

    // Get configuration
    const campaignConfiguration = campaignsConfigurations.find((config) => config.dashboard_path === dashboard)

    return {
        title: campaignConfiguration?.seo_title || '',
        description: campaignConfiguration?.seo_meta_description || '',
    }
}
