/*
MIT License

Copyright (c) 2023 White Ribbon Alliance. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

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

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { defaultLanguage, languagesAzure, languagesGoogle } from '@constants'
import { LegacyDashboardName } from '@enums'
import { ILanguage } from '@interfaces'
import { getSettings } from '@services/dashboard-api'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const hostname = request.headers.get('host') as string
    const PROD_DOMAINS_ALLOWED = process.env.PROD_DOMAINS_ALLOWED.split(' ')
    const DEV_DOMAIN = process.env.DEV_DOMAIN || '.localhost'
    const MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS = process.env.MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS
    const pmnchLink = 'https://wypw.1point8b.org'

    // Get API settings
    let translationsEnabled: boolean
    let onlyPmnch: boolean
    try {
        const settings = await getSettings()
        translationsEnabled = settings.translations_enabled
        onlyPmnch = settings.only_pmnch
    } catch (err) {
        translationsEnabled = false
        onlyPmnch = false
    }

    // Languages to use in the dashboard
    let allLanguages: ILanguage[]
    if (onlyPmnch) {
        allLanguages = languagesAzure
    } else {
        allLanguages = languagesGoogle
    }

    // All languages except en
    const allLanguagesExceptEn = [...allLanguages].filter((language) => language.code !== 'en')

    // Redirect if there is a language that is not supported
    if (!translationsEnabled) {
        // If translations is not enabled, only allow English
        allLanguages = [{ code: 'en', name: 'English' }]

        // Check if pathname contains a language that is not supported
        // e.g. when translations is disabled in the back-end, only 'en' is allowed
        const pathnameUnsupportedLanguage = allLanguagesExceptEn.find((language) => {
            if (pathname.startsWith(`/${language.code}/`) || pathname === `/${language.code}`) {
                return language
            }
        })

        if (pathnameUnsupportedLanguage) {
            // e.g. incoming request is /nl/products
            // The new URL is now /en/products
            const newPathname = pathname.replace(`/${pathnameUnsupportedLanguage.code}`, '')
            return NextResponse.redirect(new URL(`/en/${newPathname}`, request.url))
        }
    }

    // Check if pathname is missing language
    const pathnameIsMissingLanguage = allLanguages.every(
        (language) => !pathname.startsWith(`/${language.code}/`) && pathname !== `/${language.code}`
    )

    // Redirect if there is no language in pathname
    if (pathnameIsMissingLanguage) {
        // e.g. incoming request is /products
        // The new URL is now /en/products
        return NextResponse.redirect(new URL(`/${defaultLanguage.code}/${pathname}`, request.url))
    }

    // Extract the subdomain by removing the root URL
    // e.g. from 'whatwomenwant.my-dashboards.org' remove '.my-dashboards.org' to get 'whatwomenwant'
    let extractedSubdomain: string | undefined
    if (process.env.NODE_ENV === 'production') {
        // Find prod domain
        const prodDomain = PROD_DOMAINS_ALLOWED.find((prodDomain) => {
            if (hostname.endsWith(prodDomain)) {
                return prodDomain
            }
        })

        // If prod domain was not found, return 404
        if (!prodDomain) {
            return new Response('404 - Not Found', { status: 404 })
        }

        extractedSubdomain = hostname?.replace(prodDomain, '')
    } else {
        extractedSubdomain = hostname?.replace(`${DEV_DOMAIN}:3000`, '')
    }

    // Path routing e.g. explore.my-dashboards.org/en/healthwellbeing
    // If MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS equals the extracted subdomain
    if (MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS === extractedSubdomain && !onlyPmnch) {
        // Get NextURL
        const nextUrl = request.nextUrl

        // Redirect to new link for PMNCH
        if (process.env.NODE_ENV === 'production') {
            if (nextUrl.pathname.endsWith(`/${LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT}`)) {
                return NextResponse.redirect(pmnchLink)
            }
        }

        // e.g. /en/whatwomenwant
        nextUrl.pathname = `${nextUrl.pathname}`

        // Rewrite to the current hostname
        return NextResponse.rewrite(nextUrl)
    }

    // Subdomain routing e.g. whatwomenwant.my-dashboards.org/en
    else {
        // Set dashboard name from the current subdomain
        let dashboardName: string

        // PMNCH
        if (onlyPmnch) {
            // Dashboard name for pmnch
            dashboardName = LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT
        } else {
            // Redirect to new link for PMNCH
            if (process.env.NODE_ENV === 'production') {
                if (extractedSubdomain === LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT) {
                    return NextResponse.redirect(pmnchLink)
                }
            }

            // For other dashboards, the dashboard name is equal to the subdomain
            dashboardName = extractedSubdomain
        }

        // Get NextURL
        const nextUrl = request.nextUrl

        // e.g. '/whatwomenwant/en'
        nextUrl.pathname = `${nextUrl.pathname}/${dashboardName}`

        // Rewrite to the current hostname
        return NextResponse.rewrite(nextUrl)
    }
}

export const config = {
    // Exclude these paths
    matcher: '/((?!api|.*\\..*|_next).*)',

    // Allow dynamic code evaluation for Lodash
    unstable_allowDynamic: ['**/node_modules/lodash/lodash.js'],
}
