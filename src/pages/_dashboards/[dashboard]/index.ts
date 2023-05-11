import { GetStaticPaths, GetStaticProps } from 'next'
import { Dashboard } from '@page-components/Dashboard'

export default Dashboard

export const getStaticPaths: GetStaticPaths = () => {
    // Current active dashboard paths
    const paths = [
        { params: { dashboard: 'whatyoungpeoplewant' } },
        { params: { dashboard: 'whatwomenwant' } },
        { params: { dashboard: 'midwivesvoices' } },
    ]

    return {
        paths: paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    // Current active dashboards (Test data)
    const dashboards = [
        { domain: 'whatyoungpeoplewant', title: 'What Young People Want' },
        { domain: 'whatwomenwant', title: 'What Women Want' },
        { domain: 'midwivesvoices', title: 'Midwives Voices' },
    ]

    const requestedDashboard = context?.params?.dashboard
    const dashboard = dashboards.find((dashboard) => dashboard.domain === requestedDashboard)

    if (!dashboard) {
        return {
            notFound: true,
        }
    }

    return {
        props: { dashboard },
    }
}
