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

export async function GET(request: NextRequest, {params}: { params: {provider: string}}) {
    const code = request.nextUrl.searchParams.get("code");
    const provider = params.provider.toUpperCase();
    return await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, provider }),
    })
        .then((res) => {
            console.log(res.status)
            if (res.status === 200) {
                const cookies = res.headers.get("Set-Cookie");
                return NextResponse.redirect(new URL("/", request.url), {
                    headers: {
                        "Set-Cookie": cookies || "" // Ensure that the value is not null
                    },
                });
            }
            else {
                return NextResponse.redirect(new URL("/sign-in", request.url));
            }
        })
        .catch(err => console.error(err));
}
