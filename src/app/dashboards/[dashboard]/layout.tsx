import { ReactNode } from 'react'
import { Header } from 'components/client/Header'
import { Footer } from '@components/server/Footer'
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
        case Dashboards.PMNCH:
            layoutClasses = 'noto-sans-regular text-pmnch-font-color'
            break
        default:
            layoutClasses = 'open-sans text-default-font-color'
    }

    return (
        <div className={`${layoutClasses}`}>
            <Header dashboard={dashboard} />
            <main>{children}</main>
            <Footer dashboard={dashboard} />
        </div>
    )
}

export default DashboardLayout
