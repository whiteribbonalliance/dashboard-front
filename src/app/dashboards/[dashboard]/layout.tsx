import { ReactNode } from 'react'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { Dashboards } from '@enums'

interface IDashboardLayoutProps {
    children: ReactNode
    params: { dashboard: string }
}

const DashboardLayout = ({ children, params }: IDashboardLayoutProps) => {
    const { dashboard } = params

    // Set layout classes
    let layoutClasses: string
    switch (dashboard) {
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            layoutClasses = 'font-noto-sans-regular text-pmnch-colors-font'
            break
        default:
            layoutClasses = 'font-open-sans text-default-colors-font'
    }

    return (
        <div className={`text-xl ${layoutClasses}`}>
            <Header dashboard={dashboard} />
            <main>{children}</main>
            <Footer dashboard={dashboard} />
        </div>
    )
}

export default DashboardLayout
