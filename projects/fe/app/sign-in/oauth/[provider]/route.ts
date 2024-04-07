import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(
    request: NextRequest,
    { params }: { params: { provider: string } }
) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const provider = params.provider;

    console.log("code", code);
    console.log('provider', provider);

    const url = process.env.NODE_ENV === "development"
        ? 'http://localhost:8080/api/login'
        : 'https://muckgymma.p-e.kr/api/login';

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, provider }),
    })
        .then((res) => {
            if (res.ok) {
                console.log("Logged in successfully");
            } else {
                throw new Error("Failed to login");
            }
        })
        .catch((err) => {
            console.log(err);
        });

    redirect("/");
}
