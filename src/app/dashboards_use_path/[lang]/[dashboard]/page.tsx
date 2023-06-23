import { Dashboard } from '@page-components/Dashboard'
import { dashboards } from '@constants'
import { Dashboard as TDashboard } from '@types'
import { getDashboardConfig } from '@utils'

export default Dashboard

interface IGenerateMetadataProps {
    params: { dashboard: TDashboard }
}

// The dashboards will be created using the params returned by this function
export async function generateStaticParams() {
    // Generate static params for dashboards
    return dashboards.map((dashboard) => {
        return { dashboard: dashboard }
    })
}

// Set page title and description
export async function generateMetadata({ params }: IGenerateMetadataProps) {
    const { dashboard } = params
    const config = getDashboardConfig(dashboard)

    return {
        title: config.seoTitle,
        description: config.seoMetaDescription,
    }
}
