import { NextRequest } from "next/server";
import { backendUrl } from "./urls";
import { cookies } from "next/headers";
import { userInfoState } from "../../lib/slices/userInfoSlice";

export async function checkIfSignedIn(request: NextRequest) {
    // jwt토큰이 있으면 유효성 검사
    if (request.cookies.has("token")) {
        const token = request.cookies.get("token");

        return await fetch(`${backendUrl}/api/login/check`, {
            method: "GET",
            credentials: "include",
            headers: {
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
                    return true;
                } else {
                    return false;
                }
            })
            .catch((err) => {
                console.error("err: ", err);
                return false;
            });
        // jwt토큰이 없으면 로그인 페이지로 이동
    } else {
        if (request.nextUrl.pathname.startsWith("/sign-in")) {
            return true;
        } else {
            return false;
        }
    }
}

export async function checkIfEnteredInitialInfo(request: NextRequest) {
    if (request.cookies.has("token")) {
        const token = request.cookies.get("token");

        return await fetch(`${backendUrl}/api/member/initialized`, {
            method: "GET",
            credentials: "include",
            headers: {
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
                    return res.json();
                } else {
                    throw new Error("Sever responsded with an error");
                }
            })
            .then(({ status }: { status: boolean }) => {
                if (status) {
                    return status;
                } else {
                    return false;
                }
            })
            .catch((err) => {
                console.error(err);
                return false;
            });
    } else {
        return false;
    }
}

export async function FetchNickname() {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/member/setup`, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: {
            Cookie: cookieStore
                .getAll()
                .map((cookie) => `${cookie.name}=${cookie.value}`)
                .join("; "),
        },
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error("Failed to fetch user info");
        })
        .then((data: userInfoState) => {
            return data.nickname;
        })
        .catch((err) => {
            console.error(err);
            return "JohnDoe";
        });
}
