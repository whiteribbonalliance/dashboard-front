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
import { dashboards, defaultLanguage, languagesAzure, languagesGoogle, pmnchLink } from '@constants'
import { LegacyDashboardName } from '@enums'
import { ILanguage } from '@interfaces'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const hostname = request.headers.get('host') as string
    const PROD_DOMAINS_ALLOWED = process.env.PROD_DOMAINS_ALLOWED.split(' ')
    const DEV_DOMAIN = process.env.DEV_DOMAIN || '.localhost'
    const MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS = process.env.MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS
    const ONLY_PMNCH = process.env.ONLY_PMNCH.toLowerCase() === 'true'

    // Get languages
    let possibleLanguages: ILanguage[]
    if (ONLY_PMNCH) {
        possibleLanguages = languagesAzure
    } else {
        possibleLanguages = languagesGoogle
    }

    // Check if there is any supported language in the pathname or not
    const pathnameIsMissingLanguage = possibleLanguages.every(
        (language) => !pathname.startsWith(`/${language.code}/`) && pathname !== `/${language.code}`
    )

    // Redirect if there is no language in pathname
    if (pathnameIsMissingLanguage) {
        // e.g. incoming request is /products
        // The new URL is now /en/products
        return NextResponse.redirect(new URL(`/${defaultLanguage.code}/${pathname}`, request.url))
    }

    // Extract the subdomain by removing the root URL
    // e.g. from 'whatwomenwant.whiteribbonalliance.org' remove '.whiteribbonalliance.org' to get 'whatwomenwant'
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
            return new Response('404', { status: 404 })
        }

        extractedSubdomain = hostname?.replace(prodDomain, '')
    } else {
        extractedSubdomain = hostname?.replace(`${DEV_DOMAIN}:3000`, '')
    }

    // Path routing e.g. explore.whiteribbonalliance.org/en/healthwellbeing
    // If MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS equals the extracted subdomain
    if (MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS === extractedSubdomain && !ONLY_PMNCH) {
        // Check if path requested is a known dashboard name
        if (dashboards.some((dashboard) => pathname.endsWith(`/${dashboard}`))) {
            // Prevent security issues
            if (pathname.startsWith(`/dashboards_use_path`)) {
                return new Response('404', { status: 404 })
            }

            // Get NextURL
            const nextUrl = request.nextUrl

            // Redirect to new link for PMNCH
            if (process.env.NODE_ENV === 'production') {
                if (nextUrl.pathname.endsWith(`/${LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT}`)) {
                    return NextResponse.redirect(pmnchLink)
                }
            }

            // e.g. '/dashboards_use_path/en/whatwomenwant'
            nextUrl.pathname = `/dashboards_use_path${nextUrl.pathname}`

            // Rewrite to the current hostname under the app/dashboards_use_path folder
            return NextResponse.rewrite(nextUrl)
        } else {
            return new Response('404', { status: 404 })
        }
    }

    // Subdomain routing e.g. whatwomenwant.whiteribbonalliance.org/en
    else {
        // Prevent security issues – users should not be able to canonically access
        // the app/dashboards_use_subdomain folder and its respective contents
        if (pathname.startsWith(`/dashboards_use_subdomain`)) {
            return new Response('404', { status: 404 })
        }

        // Set dashboard name from the current subdomain
        let dashboardName: string
        if (ONLY_PMNCH) {
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

        // e.g. '/dashboards_use_subdomain/whatwomenwant/en'
        nextUrl.pathname = `/dashboards_use_subdomain/${dashboardName}${nextUrl.pathname}`

        // Rewrite to the current hostname under the app/dashboards_use_subdomain folder
        return NextResponse.rewrite(nextUrl)
    }
}

export const config = {
    // Exclude these paths
    matcher: '/((?!api|.*\\..*|_next).*)',

    // Allow dynamic code evaluation for Lodash
    unstable_allowDynamic: ['**/node_modules/lodash/lodash.js'],
}
