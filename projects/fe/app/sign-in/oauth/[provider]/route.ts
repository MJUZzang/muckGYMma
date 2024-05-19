import { backendUrl } from "@/_utils/urls";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export function generateStaticParams() {
    return [
        {
            provider: "google",
        },
        {
            provider: "kakao",
        },
    ];
}

export async function GET(request: NextRequest, params: { provider: string }) {
    const code = request.nextUrl.searchParams.get("code");
    const provider = params.provider;

    return await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, provider }),
    })
        .then((res) => {
            if (res.ok) {
                return NextResponse.redirect(new URL("/", request.url));
            }
            return NextResponse.redirect(new URL("/sign-in", request.url));
        })
        .catch((err) => {
            console.error(err);
        });
}
