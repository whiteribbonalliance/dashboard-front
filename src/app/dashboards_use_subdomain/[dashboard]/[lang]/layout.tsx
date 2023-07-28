import '@styles/globals.scss'
import { ReactNode } from 'react'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { DashboardName } from '@enums'
import { QueryClientProvider } from '@providers/QueryClientProvider'
import { Title } from '@components/Title'
import localFont from 'next/font/local'
import { dir } from 'i18next'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import { TDashboard } from '@types'

fontAwesomeConfig.autoAddCss = false

interface IDashboardLayoutProps {
    children: ReactNode
    params: { dashboard: TDashboard; lang: string }
}

const notoSansRegular = localFont({
    src: '../../../fonts/NotoSans/NotoSans-Regular.ttf',
    display: 'swap',
    variable: '--font-noto-sans-regular',
})

const _1point8 = localFont({
    src: '../../../fonts/1point8/1point8.ttf',
    display: 'swap',
    variable: '--font-1-point-8',
})

const helvetica = localFont({
    src: [
        { path: '../../../fonts/Helvetica/Helvetica.ttf', weight: '400', style: 'normal' },
        { path: '../../../fonts/Helvetica/Helvetica-Bold.ttf', weight: '700', style: 'bold' },
    ],
    display: 'swap',
    variable: '--font-helvetica',
})

const proximaNova = localFont({
    src: [
        { path: '../../../fonts/Proxima Nova/Proxima Nova Regular.otf', weight: '400', style: 'normal' },
        { path: '../../../fonts/Proxima Nova/Proxima Nova Bold.otf', weight: '700', style: 'bold' },
    ],
    display: 'swap',
    variable: '--font-proxima-nova',
})

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

    // @ts-expect-error Server Component
    const title = <Title dashboard={dashboard} lang={lang} noHeading />

    return (
        <html
            lang={lang}
            dir={dir(lang)}
            className={`${notoSansRegular.variable} ${_1point8.variable} ${helvetica.variable} ${proximaNova.variable}`}
        >
            <body className={`text-base ${layoutClasses}`}>
                <QueryClientProvider>
                    <Header dashboard={dashboard} lang={lang} title={title} />
                    <main className="mx-7 my-7">{children}</main>
                    {/* @ts-expect-error Server Component */}
                    <Footer dashboard={dashboard} lang={lang} />
                </QueryClientProvider>
            </body>
        </html>
    )
}

export default DashboardLayout
