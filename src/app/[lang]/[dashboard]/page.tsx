import { getCampaignsConfigurations, getSettings } from '@services/dashboard-api'
import { revalidatePath } from 'next/cache'
import { DashboardPage } from '@page-components/DashboardPage'
import { languagesAzure, languagesGoogle } from '@constants'
import { ICampaignConfiguration } from '@interfaces'

export default DashboardPage

// Set to 'error' if building static pages
export const dynamic = 'force-dynamic'

interface IParams {
    lang: string
    dashboard: string
}

// Uncommenting this function will allow building static pages
// export async function generateStaticParams() {
//     // Purge cache to always re-fetch it during build
//     revalidatePath('/[lang]/[dashboard]', 'page')
//
//     // Get API settings
//     let translationsEnabled: boolean
//     let cloudService: string
//     try {
//         const settings = await getSettings()
//         translationsEnabled = settings.translations_enabled
//         cloudService = settings.cloud_service
//     } catch (err) {
//         translationsEnabled = false
//         cloudService = 'google'
//     }
//
//     // Languages
//     let languages: string[]
//     if (!translationsEnabled) {
//         languages = ['en']
//     } else {
//         if (cloudService) {
//             languages = languagesAzure.map((l) => l.code)
//         } else {
//             languages = languagesGoogle.map((l) => l.code)
//         }
//     }
//
//     // Get campaigns configurations
//     const campaignsConfigurations = await getAllCampaignsConfigurations()
//
//     // Get all dashboard paths
//     const dashboards = campaignsConfigurations.map((config) => config.dashboard_path)
//
//     // Generate static params
//     const params: IParams[] = []
//     for (const lang of languages) {
//         for (const dashboard of dashboards) {
//             params.push({ lang, dashboard })
//         }
//     }
//
//     return params
// }

// Set page title and description
export async function generateMetadata({ params }: { params: IParams }) {
    const { lang, dashboard } = params

    // Get configurations
    let campaignsConfigurations: ICampaignConfiguration[]
    try {
        campaignsConfigurations = await getCampaignsConfigurations(lang)
    } catch (error) {
        campaignsConfigurations = []
    }

    // Get configuration
    const campaignConfiguration = campaignsConfigurations.find((config) => config.dashboard_path === dashboard)

    return {
        title: campaignConfiguration?.site_title || '',
        description: campaignConfiguration?.site_description || '',
        icons: {
            icon: `/dashboards/${dashboard}/favicon.ico`,
        },
    }
}
