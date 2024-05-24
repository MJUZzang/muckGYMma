import { backendUrl } from "@/_utils/urls";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
    return NextResponse.next();
    // return await fetch(`${backendUrl}/api/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ code, provider }),
    // })
    //     .then((res) => {
    //         if (res.status === 200) {
    //             const cookies = res.headers.get("Set-Cookie");
    //             return NextResponse.redirect(new URL("/", request.url), {
    //                 headers: {
    //                     "Set-Cookie": cookies || "" // Ensure that the value is not null
    //                 },
    //             });
    //         }
    //         else {
    //             return NextResponse.redirect(new URL("/sign-in", request.url));
    //         }
    //     })
    //     .catch(err => console.error(err));
}
