import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { defaultLanguage, languages } from '@constants'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

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

    // Get hostname
    const hostname = request.headers.get('host')

    // Get prod domain
    const prodDomain = process.env.NEXT_PUBLIC_PROD_DOMAIN as string

    // Get dev domain
    const devDomain = (process.env.NEXT_PUBLIC_DEV_DOMAIN as string) || '.localhost'

    // Get the custom domain/subdomain value by removing the root URL
    // e.g. from 'whatwomenwant.whiteribbonalliance.org' remove '.whiteribbonalliance.org' to get 'whatwomenwant' (currentHost)
    const currentHost =
        process.env.NODE_ENV === 'production'
            ? hostname?.replace(prodDomain, '')
            : hostname?.replace(`${devDomain}:3000`, '')

    // Prevent security issues – users should not be able to canonically access
    // the pages/dashboards folder and its respective contents. This can also be done
    // via rewrites to a custom 404 page
    if (pathname.startsWith(`/dashboards`)) {
        return new Response(null, { status: 404 })
    }

    // Get url
    const nextUrl = request.nextUrl
    nextUrl.pathname = `/dashboards/${currentHost}${nextUrl.pathname}`

    // Rewrite to the current hostname under the app/dashboards folder
    return NextResponse.rewrite(nextUrl)
}

export const config = {
    // Exclude these paths
    matcher: '/((?!api|.*\\..*|_next).*)',
}
