import { backendUrl } from "@/_utils/urls";
import { checkIfEnteredInitialInfo, checkIfSignedIn } from "@/_utils/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    if (process.env.NODE_ENV !== "development") {
        // 로그인한 지 확인
        if (request.nextUrl.pathname.startsWith("/sign-in"))
            return NextResponse.next();
        const isSignedIn = await checkIfSignedIn(request);
        if (!isSignedIn)
            return NextResponse.redirect(new URL("/sign-in", request.url));

        // 초기 유저 데이터 입력한 지 확인
        if (request.nextUrl.pathname.startsWith("/initial-setup"))
            return NextResponse.next();
        const hasEnteredInitialInfo = await checkIfEnteredInitialInfo(request);
        if (!hasEnteredInitialInfo)
            return NextResponse.redirect(
                new URL("/initial-setup/1", request.url)
            );
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: "/((?!api|_next/static|_next/image|favicon*|sw|manifest|android-chrome-*|workbox-*|icon-*|_next/webpack-*).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },

        {
            source: "/((?!api|_next/static|_next/image|favicon*|sw|manifest|android-chrome-*|workbox-*|icon-*|_next/webpack-*).*)",
            has: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },

        {
            source: "/((?!api|_next/static|_next/image|favicon*|sw|manifest|android-chrome-*|workbox-*|icon-*|_next/webpack-*).*)",
            has: [{ type: "header", key: "x-present" }],
            missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
        },
    ],
};
