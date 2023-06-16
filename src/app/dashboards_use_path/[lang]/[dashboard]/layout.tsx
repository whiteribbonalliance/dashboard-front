import { ReactNode } from 'react'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { DashboardName } from '@enums'
import { QueryClientProvider } from '@providers/QueryClientProvider'

interface IDashboardLayoutProps {
    children: ReactNode
    params: { dashboard: string; lang: string }
}

const DashboardLayout = async ({ children, params }: IDashboardLayoutProps) => {
    const { dashboard, lang } = params

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
            <QueryClientProvider>
                <Header dashboard={dashboard} lang={lang} />
                <main className="mx-7 my-7">{children}</main>
                <Footer dashboard={dashboard} lang={lang} />
            </QueryClientProvider>
        </body>
    )
}

export default DashboardLayout
