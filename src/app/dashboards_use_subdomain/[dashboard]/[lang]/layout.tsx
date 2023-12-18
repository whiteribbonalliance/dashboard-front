import '@styles/globals.scss'
import { ReactNode } from 'react'
import { QueryClientProvider } from '@providers/QueryClientProvider'
import localFont from 'next/font/local'
import { dir } from 'i18next'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import { GoogleAnalytics } from '@components/GoogleAnalytics'
import { LegacyDashboardName } from '@enums'

fontAwesomeConfig.autoAddCss = false

interface IDashboardLayoutProps {
    children: ReactNode
    params: { dashboard: string; lang: string }
}

const notoSansRegular = localFont({
    src: '../../../fonts/NotoSans/NotoSans-Regular.ttf',
    display: 'swap',
    variable: '--font-noto-sans-regular',
})

const notoSansBold = localFont({
    src: '../../../fonts/NotoSans/NotoSans-Bold.ttf',
    display: 'swap',
    variable: '--font-noto-sans-bold',
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

    // Set favicon
    let favicon
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            favicon = <link rel="icon" href="/favicons/pmnch_favicon_2.png" sizes="any" />
            break
        default:
            favicon = <link rel="icon" href="/favicons/www_favicon.png" sizes="any" />
    }

    return (
        <html
            lang={lang}
            dir={dir(lang)}
            className={`${notoSansRegular.variable} ${notoSansBold.variable} ${_1point8.variable} ${helvetica.variable} ${proximaNova.variable}`}
        >
            <head>{favicon}</head>
            <body>
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
                ) : null}
                <QueryClientProvider>{children}</QueryClientProvider>
            </body>
        </html>
    )
}

export default DashboardLayout
