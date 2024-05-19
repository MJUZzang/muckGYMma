import { backendUrl } from "@/_utils/urls";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    if (process.env.NODE_ENV !== "development") {
        // jwt토큰이 있으면 유효성 검사
        if (request.cookies.has("token")) {
            const token = request.cookies.get("token");
            console.log("token: ", token);

            await fetch(`${backendUrl}/api/login/check`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Cookie: request.cookies
                        .getAll()
                        .map((cookie) => {
                            return `${cookie.name}=${cookie.value}`;
                        })
                        .join("; "),
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return NextResponse.next();
                    } else if (res.status === 401) {
                        return NextResponse.redirect(
                            new URL("/sign-in", request.url)
                        );
                    }
                })
                .catch((err) => {
                    console.log("err: ", err);
                });
        // jwt토큰이 없으면 로그인 페이지로 이동
        } else {
            if (request.nextUrl.pathname.startsWith("/sign-in")) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(new URL("/sign-in", request.url));
            }
        }
    }
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
            source: "/((?!api|_next/static|_next/image|favicon*|sw|manifest|android-chrome-*|workbox-*).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },

        {
            source: "/((?!api|_next/static|_next/image|favicon*|sw|manifest|android-chrome-*|workbox-*).*)",
            has: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },

        {
            source: "/((?!api|_next/static|_next/image|favicon*|sw|manifest|android-chrome-*|workbox-*).*)",
            has: [{ type: "header", key: "x-present" }],
            missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
        },
    ],
};
