import { ReactNode } from 'react'

interface IRootLayoutProps {
    children: ReactNode
}

const RootLayout = async ({ children }: IRootLayoutProps) => {
    return <>{children}</>
}

export default RootLayout
