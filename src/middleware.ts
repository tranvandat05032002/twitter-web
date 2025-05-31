// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { HiArrowPathRoundedSquare } from 'react-icons/hi2'
import { IUser } from './types/userTypes'

export function middleware(req: NextRequest) {
    const url = req.nextUrl
    const pathname = url.pathname
    const searchParams = url.searchParams

    const queryProfileUsername = searchParams.get('profile_username');
    const currentUserCookie = req.cookies.get('twitter_profile')?.value

    if (!currentUserCookie) return NextResponse.next()

    try {
        let currentUser
        try {
            currentUser = JSON.parse(decodeURIComponent(currentUserCookie)) as IUser
        } catch (error) {
            return NextResponse.next()
        }

        const currentUsername = currentUser?.username

        if (pathname === '/profile/v1') {
            if (queryProfileUsername === currentUsername) {
                // Nếu đúng user thì redirect về /profile/{username}
                const redirectUrl = req.nextUrl.clone();
                redirectUrl.pathname = `/profile/${currentUsername}`;
                redirectUrl.search = ''; // Xoá query
                return NextResponse.redirect(redirectUrl);
            } else if (queryProfileUsername !== currentUsername && queryProfileUsername) {
                // Nếu không phải user hiện tại nhưng cố truy cập /profile/v1?profile_username=abc
                // thì cho phép ở lại /profile/v1?profile_username=abc (hoặc bạn có thể redirect đâu đó)
                return NextResponse.next();
            }
        }

        // Xử lý khi user cố gắng truy cập vào trang profile cho khách
        if (pathname.startsWith("/profile/") && pathname !== "/profile/v1") {
            const pathUser = pathname.split("/")[2]
            if (pathUser !== currentUsername) {
                const redirectUrl = req.nextUrl.clone()
                redirectUrl.pathname = '/profile/v1'
                redirectUrl.searchParams.set('profile_username', pathUser)

                return NextResponse.redirect(redirectUrl)
            }
        }

    } catch (error) {
        console.error('Lỗi phân tích cookie:', error)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/profile/:path*'
    ],
}