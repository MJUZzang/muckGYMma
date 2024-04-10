"use client";

import { backendUrl } from "@/_utils/urls";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const code = searchParams.get("code");
        const provider = (params.provider as string).toUpperCase();

        fetch(`${backendUrl}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, provider }),
        })
            .then((res) => {
                if (res.ok) {
                    const cookies = res.headers.get("Set-Cookie");
                    if (cookies) {
                        document.cookie = cookies;
                        console.log("Logged in successfully");
                    }
                    router.push("/");
                } else {
                    throw new Error("Failed to login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params.provider, searchParams, router]);
    return null;
};

export default Page;
