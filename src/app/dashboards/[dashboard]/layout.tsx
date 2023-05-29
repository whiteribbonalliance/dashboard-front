import { ReactNode } from 'react'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { DashboardName } from '@enums'
import { QueryClientProvider } from '@providers/QueryClientProvider'

interface IDashboardLayoutProps {
    children: ReactNode
    params: { dashboard: string }
}

const DashboardLayout = async ({ children, params }: IDashboardLayoutProps) => {
    const { dashboard } = params

    // Set layout classes
    let layoutClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            layoutClasses =
                'font-noto-sans-regular text-pmnchColors-font selection:bg-pmnchColors-primary selection:text-white'
            break
        default:
            layoutClasses =
                'font-open-sans text-defaultColors-font selection:bg-defaultColors-tertiary selection:text-white'
    }

    return (
        <body className={`text-base ${layoutClasses}`}>
            <Header dashboard={dashboard} />
            <QueryClientProvider>
                <main className="mx-7 my-7">{children}</main>
            </QueryClientProvider>
            <Footer dashboard={dashboard} />
        </body>
    )
}

export default DashboardLayout
