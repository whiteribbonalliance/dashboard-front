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
