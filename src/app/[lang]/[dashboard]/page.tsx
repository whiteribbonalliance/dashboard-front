/*
MIT License

Copyright (c) 2023 World We Want. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

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
