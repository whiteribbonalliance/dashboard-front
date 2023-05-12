import { ReactNode } from 'react'
import { Header } from 'components/client/Header'
import { Footer } from '@components/server/Footer'

interface IDashboardLayoutProps {
    children: ReactNode
    params: { dashboard: string }
}

const DashboardLayout = ({ children, params }: IDashboardLayoutProps) => {
    const { dashboard } = params

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default DashboardLayout
