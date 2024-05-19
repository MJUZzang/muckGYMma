import { backendUrl } from "@/_utils/urls";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    if (process.env.NODE_ENV !== "development") {
        if (request.cookies.has("token")) {
            const token = request.cookies.get("token");
            console.log("token: ", token);

            await fetch(`${backendUrl}/api/login/check`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
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
                    console.log("res: ", res.status);
                })
                .catch((err) => {
                    console.log("err: ", err);
                });
        } else {
            console.log("no token");
            if (!request.nextUrl.pathname.startsWith("/sign-in")) {
                return NextResponse.redirect(new URL("/sign-in", request.url));
            }
        }
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
