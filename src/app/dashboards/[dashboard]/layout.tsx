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

    // Set font
    let fontClassName = ''
    switch (dashboard) {
        case Dashboards.PMNCH:
            fontClassName = 'font-pmnch-family'
            break
        default:
            fontClassName = 'font-default-family'
    }

    // Set color
    let colorClassName = ''
    switch (dashboard) {
        case Dashboards.PMNCH:
            colorClassName = 'text-pmnch-font-color'
            break
        default:
            colorClassName = 'text-default-font-color'
    }

    return (
        <div className={`${fontClassName} ${colorClassName}`}>
            <Header dashboard={dashboard} />
            <main>{children}</main>
            <Footer dashboard={dashboard} />
        </div>
    )
}

export default DashboardLayout
