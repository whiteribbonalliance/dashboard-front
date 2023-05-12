import '@styles/globals.scss'
import { ReactNode } from 'react'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'

fontAwesomeConfig.autoAddCss = false

interface IDashboardLayoutProps {
    children: ReactNode
}

const Layout = ({ children }: IDashboardLayoutProps) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export default Layout
