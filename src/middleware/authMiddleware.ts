import { NextRequest, NextResponse } from "next/server";

export default function authRedirectMiddleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const access_token = req.cookies.get('twitter_access_token')?.value
    const isPublicPath =
        pathname === '/' || pathname === '/sign-up' || pathname === '/sign-in' || pathname.startsWith('/_next')

    if (!access_token && !isPublicPath) {
        const loginUrl = req.nextUrl.clone()
        loginUrl.pathname = '/sign-in'
        loginUrl.search = ''
        return NextResponse.redirect(loginUrl)
    }

    if (access_token && isPublicPath && (pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up')) {
        const homeUrl = req.nextUrl.clone()
        homeUrl.pathname = '/home'
        homeUrl.search = ''
        return NextResponse.redirect(homeUrl)
    }

    return NextResponse.next()
}