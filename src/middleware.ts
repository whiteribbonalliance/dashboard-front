import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { dashboards, defaultLanguage, languages } from '@constants'
import { isSubdomain } from '@utils'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const hostname = request.headers.get('host') as string

    // Get prod domains
    const prodDomains = (process.env.NEXT_PUBLIC_PROD_DOMAINS as string).split(' ')

    // Get dev domain
    const devDomain = (process.env.NEXT_PUBLIC_DEV_DOMAIN as string) || '.localhost'

    // Get the main subdomain
    const mainSubdomain = process.env.NEXT_PUBLIC_MAIN_SUBDOMAIN as string

    // Check if there is any supported language in the pathname or not
    const pathnameIsMissingLanguage = languages.every(
        (language) => !pathname.startsWith(`/${language.code}/`) && pathname !== `/${language.code}`
    )

    // Redirect if there is no language
    if (pathnameIsMissingLanguage) {
        // e.g. incoming request is /products
        // The new URL is now /en/products
        return NextResponse.redirect(new URL(`/${defaultLanguage.code}/${pathname}`, request.url))
    }

    // Get the custom domain/subdomain value by removing the root URL
    // e.g. from 'whatwomenwant.whiteribbonalliance.org' remove '.whiteribbonalliance.org' to get 'whatwomenwant' (currentHost)
    let currentHost: string | undefined
    if (process.env.NODE_ENV === 'production') {
        // Find prod domain
        const prodDomain = prodDomains.find((prodDomain) => {
            if (hostname.endsWith(prodDomain)) {
                return prodDomain
            }
        })

        // If prod domain was not found, return 404
        if (!prodDomain) {
            return new Response('404', { status: 404 })
        }

        currentHost = hostname?.replace(prodDomain, '')
    } else {
        currentHost = hostname?.replace(`${devDomain}:3000`, '')
    }

    // If subdomain equals e.g. 'explore' and
    // if a path is requested with a dashboard name, then ignore subdomain routing and use path instead
    if (currentHost == mainSubdomain) {
        if (dashboards.some((dashboard) => pathname.endsWith(dashboard))) {
            if (pathnameIsMissingLanguage) {
                return NextResponse.redirect(new URL(`/${defaultLanguage.code}/${pathname}`, request.url))
            } else {
                // Prevent security issues
                if (pathname.startsWith(`/dashboards_with_subdomain`)) {
                    return new Response('404', { status: 404 })
                }

                // Get url
                const nextUrl = request.nextUrl
                nextUrl.pathname = `/dashboards_with_path${nextUrl.pathname}`

                // Rewrite to the current hostname under the app/dashboards_with_path folder
                return NextResponse.rewrite(nextUrl)
            }
        } else {
            return new Response('404', { status: 404 })
        }
    }

    // Prevent security issues – users should not be able to canonically access
    // the app/dashboards_with_subdomain folder and its respective contents. This can also be done
    // via rewrites to a custom 404 page
    if (pathname.startsWith(`/dashboards_with_subdomain`)) {
        return new Response('404', { status: 404 })
    }

    // Get url
    const nextUrl = request.nextUrl
    nextUrl.pathname = `/dashboards_with_subdomain/${currentHost}${nextUrl.pathname}`

    // Rewrite to the current hostname under the app/dashboards_with_subdomain folder
    return NextResponse.rewrite(nextUrl)
}

export const config = {
    // Exclude these paths
    matcher: '/((?!api|.*\\..*|_next).*)',
}
