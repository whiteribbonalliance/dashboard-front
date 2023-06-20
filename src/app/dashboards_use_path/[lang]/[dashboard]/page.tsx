import { Dashboard } from '@page-components/Dashboard'
import { dashboards, seoMainTitle } from '@constants'
import { DashboardName } from '@enums'
import {
    healthWellBeingConfig,
    midwivesVoicesConfig,
    whatWomenWantConfig,
    whatYoungPeopleWantConfig,
    wwwPakistanConfig,
} from '@configurations'

export default Dashboard

interface IGenerateMetadataProps {
    params: { dashboard: string }
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
    switch (params.dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            return {
                title: whatWomenWantConfig.seoTitle,
                description: whatWomenWantConfig.seoMetaDescription,
            }
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            return {
                title: whatYoungPeopleWantConfig.seoTitle,
                description: whatYoungPeopleWantConfig.seoMetaDescription,
            }
        case DashboardName.MIDWIVES_VOICES:
            return {
                title: midwivesVoicesConfig.seoTitle,
                description: midwivesVoicesConfig.seoMetaDescription,
            }
        case DashboardName.HEALTH_WELL_BEING:
            return {
                title: healthWellBeingConfig.seoTitle,
                description: healthWellBeingConfig.seoMetaDescription,
            }
        case DashboardName.WWW_PAKISTAN:
            return {
                title: wwwPakistanConfig.seoTitle,
                description: wwwPakistanConfig.seoMetaDescription,
            }
        default:
            return {
                title: seoMainTitle,
                description: '',
            }
    }
}
