import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Get hostname
    const hostname = req.headers.get('host')

    // Get prod domain
    const prodDomain = process.env.PROD_DOMAIN as string

    // Get dev domain
    const devDomain = (process.env.DEV_DOMAIN as string) || '.localhost:3000'

    // If localhost, assign the host value manually
    // If production, get the custom domain/subdomain value by removing the root URL
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
    const nextUrl = req.nextUrl
    nextUrl.pathname = `/dashboards/${currentHost}${nextUrl.pathname}`

    if (
        !pathname.includes('.') && // Exclude all files in the public folder
        !pathname.startsWith('/api') // Exclude all API routes
    ) {
        // Rewrite to the current hostname under the pages/dashboards folder
        // The main logic component will happen in pages/dashboards/[dashboard]/index.ts
        return NextResponse.rewrite(nextUrl)
    }
}
