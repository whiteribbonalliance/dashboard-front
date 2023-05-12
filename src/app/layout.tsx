import '@styles/globals.scss'
import { ReactNode } from 'react'

interface IDashboardLayoutProps {
    children: ReactNode
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
    return (
        <html lang="en">
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}

export default DashboardLayout
