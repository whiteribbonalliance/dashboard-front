/*
MIT License

Copyright (c) 2023 World We Want. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import '@styles/globals.scss'
import { ReactNode } from 'react'
import { QueryClientProvider } from '@providers/QueryClientProvider'
import localFont from 'next/font/local'
import { dir } from 'i18next'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import { GoogleAnalytics } from '@components/GoogleAnalytics'

fontAwesomeConfig.autoAddCss = false

interface IDashboardLayoutProps {
    children: ReactNode
    params: { dashboard: string; lang: string }
}

const notoSansRegular = localFont({
    src: '../../fonts/NotoSans/NotoSans-Regular.ttf',
    display: 'swap',
    variable: '--font-noto-sans-regular',
})

const notoSansBold = localFont({
    src: '../../fonts/NotoSans/NotoSans-Bold.ttf',
    display: 'swap',
    variable: '--font-noto-sans-bold',
})

const _1point8 = localFont({
    src: '../../fonts/1point8/1point8.ttf',
    display: 'swap',
    variable: '--font-1-point-8',
})

const helvetica = localFont({
    src: [
        { path: '../../fonts/Helvetica/Helvetica.ttf', weight: '400', style: 'normal' },
        { path: '../../fonts/Helvetica/Helvetica-Bold.ttf', weight: '700', style: 'bold' },
    ],
    display: 'swap',
    variable: '--font-helvetica',
})

const proximaNova = localFont({
    src: [
        { path: '../../fonts/Proxima Nova/Proxima Nova Regular.otf', weight: '400', style: 'normal' },
        { path: '../../fonts/Proxima Nova/Proxima Nova Bold.otf', weight: '700', style: 'bold' },
    ],
    display: 'swap',
    variable: '--font-proxima-nova',
})

const DashboardLayout = async ({ children, params }: IDashboardLayoutProps) => {
    const { lang } = params

    return (
        <html
            lang={lang}
            dir={dir(lang)}
            className={`${notoSansRegular.variable} ${notoSansBold.variable} ${_1point8.variable} ${helvetica.variable} ${proximaNova.variable}`}
        >
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
