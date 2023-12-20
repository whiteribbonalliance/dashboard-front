import { getAllCampaignsConfigurations, getSettings } from '@services/dashboard-api'
import { revalidatePath } from 'next/cache'
import { DashboardPage } from '@page-components/DashboardPage'
import { languagesAzure, languagesGoogle } from '@constants'

export default DashboardPage

export const dynamic = 'error'

interface IParams {
    lang: string
    dashboard: string
}

// The dashboards will be created using the params returned by this function
export async function generateStaticParams() {
    // Purge cache to always re-fetch it during build
    revalidatePath('/[lang]/[dashboard]', 'page')

    // Get API settings
    let translationsEnabled: boolean
    let onlyPmnch: boolean
    try {
        const settings = await getSettings()
        translationsEnabled = settings.translations_enabled
        onlyPmnch = settings.only_pmnch
    } catch (err) {
        translationsEnabled = false
        onlyPmnch = false
    }

    // Languages
    let languages: string[]
    if (!translationsEnabled) {
        languages = ['en']
    } else {
        if (onlyPmnch) {
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
    const params: IParams[] = []
    for (const lang of languages) {
        for (const dashboard of dashboards) {
            params.push({ lang, dashboard })
        }
    }

    return params
}

// Set page title and description
export async function generateMetadata({ params }: { params: IParams }) {
    const { dashboard } = params

    // Get configurations
    const campaignsConfigurations = await getAllCampaignsConfigurations()

    // Get configuration
    const campaignConfiguration = campaignsConfigurations.find((config) => config.dashboard_path === dashboard)

    return {
        title: campaignConfiguration?.seo_title || '',
        description: campaignConfiguration?.seo_meta_description || '',
        icons: {
            icon: `/dashboards/${dashboard}/favicon.ico`,
        },
    }
}
