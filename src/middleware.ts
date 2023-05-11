import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Get hostname
    const hostname = req.headers.get('host')

    // Get domain
    const domain = process.env.DOMAIN as string

    // If localhost, assign the host value manually
    // If production, get the custom domain/subdomain value by removing the root URL
    const currentHost =
        process.env.NODE_ENV === 'production' ? hostname?.replace(domain, '') : hostname?.replace('.localhost:3000', '')

    // Prevent security issues – users should not be able to canonically access
    // the pages/_dashboards folder and its respective contents. This can also be done
    // via rewrites to a custom 404 page
    if (pathname.startsWith(`/_dashboards`)) {
        return new Response(null, { status: 404 })
    }

    // Get url
    const nextUrl = req.nextUrl
    nextUrl.pathname = `/_dashboards/${currentHost}${nextUrl.pathname}`

    if (
        !pathname.includes('.') && // Exclude all files in the public folder
        !pathname.startsWith('/api') // Exclude all API routes
    ) {
        // Rewrite to the current hostname under the pages/_dashboards folder
        // The main logic component will happen in pages/_dashboards/[dashboard]/index.ts
        return NextResponse.rewrite(nextUrl)
    }
}
