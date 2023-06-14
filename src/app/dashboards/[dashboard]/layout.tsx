import '@styles/globals.scss'
import { ReactNode } from 'react'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'

fontAwesomeConfig.autoAddCss = false

interface IRootLayoutProps {
    children: ReactNode
}

const RootLayout = async ({ children }: IRootLayoutProps) => {
    return <>{children}</>
}

export default RootLayout
