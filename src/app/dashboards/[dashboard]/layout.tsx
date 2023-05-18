import { ReactNode } from 'react'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { Dashboards } from '@enums'

interface IDashboardLayoutProps {
    children: ReactNode
    params: { dashboard: string }
}

const DashboardLayout = async ({ children, params }: IDashboardLayoutProps) => {
    const { dashboard } = params

    // Set layout classes
    let layoutClasses: string
    switch (dashboard) {
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            layoutClasses =
                'font-noto-sans-regular text-pmnch-colors-font selection:bg-pmnch-colors-primary selection:text-white'
            break
        default:
            layoutClasses =
                'font-open-sans text-default-colors-font selection:bg-default-colors-tertiary selection:text-white'
    }

    return (
        <body className={`text-lg ${layoutClasses}`}>
            <Header dashboard={dashboard} />
            <main className="mx-7 mb-12 mt-6">{children}</main>
            <Footer dashboard={dashboard} />
        </body>
    )
}

export default DashboardLayout
