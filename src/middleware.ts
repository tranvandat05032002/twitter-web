// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import authRedirectMiddleware from './middleware/authMiddleware'
import { profileRedirectMiddleware } from './middleware/profileMiddleware'

export function middleware(req: NextRequest) {
    const authRes = authRedirectMiddleware(req)
    if (authRes.status !== 200) return authRes

    const profileRes = profileRedirectMiddleware(req)
    if (profileRes.status !== 200) return profileRes

    return NextResponse.next()
}

export const config = {
    // matcher: [
    //     '/profile/:path*'
    // ],
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}