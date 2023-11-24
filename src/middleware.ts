import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { dashboards, defaultLanguage, languagesAzure, languagesGoogle } from '@constants'
import { DashboardName } from '@enums'
import { ILanguage } from '@interfaces'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const hostname = request.headers.get('host') as string
    const PROD_DOMAINS_ALLOWED = process.env.PROD_DOMAINS_ALLOWED.split(' ')
    const DEV_DOMAIN = process.env.DEV_DOMAIN || '.localhost'
    const SUBDOMAIN = process.env.SUBDOMAIN
    const ONLY_PMNCH = process.env.ONLY_PMNCH.toLowerCase() === 'true'

    let possibleSubdomains: string[]
    let possibleLanguages: ILanguage[]
    if (ONLY_PMNCH) {
        // Only PMNCH
        possibleSubdomains = [SUBDOMAIN]

        // Languages for PMNCH
        possibleLanguages = languagesAzure
    } else {
        // Remove PMNCH and keep other dashboard names as possible subdomains
        possibleSubdomains = dashboards.filter((dashboard) => dashboard !== DashboardName.WHAT_YOUNG_PEOPLE_WANT)

        // Languages for all other dashboards
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

    // Path routing (skip if PMNCH)
    // On SUBDOMAIN equals the extracted subdomain and the path requested is a dashboard name
    if (SUBDOMAIN === extractedSubdomain && !ONLY_PMNCH) {
        if (possibleSubdomains.some((dashboard) => pathname.endsWith(`/${dashboard}`))) {
            // Prevent security issues
            if (pathname.startsWith(`/dashboards_use_path`)) {
                return new Response('404', { status: 404 })
            }

            const nextUrl = request.nextUrl

            // Redirect to new link for PMNCH
            if (nextUrl.pathname.endsWith(`/${DashboardName.WHAT_YOUNG_PEOPLE_WANT}`)) {
                return NextResponse.redirect('https://wypw.1point8b.org/en')
            }

            // e.g. '/dashboards_use_path/en/whatwomenwant'
            nextUrl.pathname = `/dashboards_use_path${nextUrl.pathname}`

            // Rewrite to the current hostname under the app/dashboards_use_path folder
            return NextResponse.rewrite(nextUrl)
        } else {
            return new Response('404', { status: 404 })
        }
    }

    // Subdomain routing
    else {
        // Prevent security issues – users should not be able to canonically access
        // the app/dashboards_use_subdomain folder and its respective contents
        if (pathname.startsWith(`/dashboards_use_subdomain`)) {
            return new Response('404', { status: 404 })
        }

        // Set dashboard name
        let dashboardName: string
        if (ONLY_PMNCH) {
            // Dashboard name for pmnch
            dashboardName = DashboardName.WHAT_YOUNG_PEOPLE_WANT
        } else {
            // For other dashboards, the dashboard name is equal to the subdomain
            dashboardName = extractedSubdomain
        }

        // e.g. '/dashboards_use_subdomain/whatwomenwant/en'
        const nextUrl = request.nextUrl
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
