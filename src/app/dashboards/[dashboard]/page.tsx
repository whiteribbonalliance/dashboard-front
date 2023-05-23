import { Dashboard } from 'page-components/Dashboard'
import { dashboards, seoMainTitle } from '@constants'
import { DashboardCode } from '@enums'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'

export default Dashboard

interface IGenerateMetadataProps {
    params: { dashboard: string }
}

export async function generateStaticParams() {
    // Generate static params for dashboards
    return dashboards.map((dashboard) => {
        return { dashboard: dashboard }
    })
}

// Set page title and description
export async function generateMetadata({ params }: IGenerateMetadataProps) {
    switch (params.dashboard) {
        case DashboardCode.WHAT_WOMEN_WANT:
            return {
                title: whatWomenWantConfig.seoTitle,
                description: whatWomenWantConfig.seoMetaDescription,
            }
        case DashboardCode.WHAT_YOUNG_PEOPLE_WANT:
            return {
                title: whatYoungPeopleWantConfig.seoTitle,
                description: whatYoungPeopleWantConfig.seoMetaDescription,
            }
        case DashboardCode.MIDWIVES_VOICES:
            return {
                title: midwivesVoicesConfig.seoTitle,
                description: midwivesVoicesConfig.seoMetaDescription,
            }
        default:
            return {
                title: seoMainTitle,
                description: '',
            }
    }
}
