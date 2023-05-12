import { Dashboard } from '@page-components/Dashboard'
import { dashboards } from '@constants'

export default Dashboard

export async function generateStaticParams() {
    // Generate static params for dashboards
    return dashboards.map((dashboard) => {
        return { dashboard: dashboard }
    })
}
