import '@styles/globals.scss'
import { ReactNode } from 'react'
import localFont from 'next/font/local'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'

fontAwesomeConfig.autoAddCss = false

interface IRootLayoutProps {
    children: ReactNode
}

const notoSansRegular = localFont({
    src: './fonts/NotoSans/NotoSans-Regular.ttf',
    display: 'swap',
    variable: '--font-noto-sans-regular',
})

const _1point8 = localFont({
    src: './fonts/1point8/1point8.ttf',
    display: 'swap',
    variable: '--font-1-point-8',
})

const helvetica = localFont({
    src: [
        { path: './fonts/Helvetica/Helvetica.ttf', weight: '400', style: 'normal' },
        { path: './fonts/Helvetica/Helvetica-Bold.ttf', weight: '700', style: 'bold' },
    ],
    display: 'swap',
    variable: '--font-helvetica',
})

const proximaNova = localFont({
    src: [
        { path: './fonts/Proxima Nova/Proxima Nova Regular.otf', weight: '400', style: 'normal' },
        { path: './fonts/Proxima Nova/Proxima Nova Bold.otf', weight: '700', style: 'bold' },
    ],
    display: 'swap',
    variable: '--font-proxima-nova',
})

const RootLayout = async ({ children }: IRootLayoutProps) => {
    return (
        <html
            className={`${notoSansRegular.variable} ${_1point8.variable} ${helvetica.variable} ${proximaNova.variable}`}
        >
            {children}
        </html>
    )
}

export default RootLayout
