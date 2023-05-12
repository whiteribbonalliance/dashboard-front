import { Dashboard } from 'page-components/Dashboard'
import { dashboards } from '@constants'
import { Dashboards } from '@enums'

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
        case Dashboards.WWW:
            return {
                title: 'What Women Want | White Ribbon Alliance',
                description:
                    'What Women Want: What Midwives Want, led by White Ribbon Alliance (WRA) in collaboration with the International Confederation of Midwives (ICM), is a key companion to the What Women Want (WWW) campaign, which asked 1.2 million women and girls their top demand for quality reproductive and maternal healthcare.',
            }
        case Dashboards.PMNCH:
            return {
                title: 'What Young People Want | White Ribbon Alliance',
                description: 'What Young People Want Interactive Dashboard',
            }
        case Dashboards.MIDWIVES_VOICES:
            return {
                title: 'What Midwives Want | White Ribbon Alliance',
                description:
                    'What Women Want: What Midwives Want, led by White Ribbon Alliance (WRA) in collaboration with the International Confederation of Midwives (ICM), is a key companion to the What Women Want (WWW) campaign, which asked 1.2 million women and girls their top demand for quality reproductive and maternal healthcare.',
            }
        default:
            return {
                title: 'White Ribbon Alliance',
                description: '',
            }
    }
}
