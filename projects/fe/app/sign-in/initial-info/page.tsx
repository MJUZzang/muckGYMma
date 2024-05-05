"use client";

import { backendUrl } from "@/_utils/urls";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
    const router = useRouter();

    function checkHasEnteredInitialInfo() {
        if (process.env.NODE_ENV !== "development") {
            fetch(`${backendUrl}/api/member/initialized`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("Sever responsded with an error");
                    }
                })
                .then((data) => {
                    if (data.status) {
                        router.push("/");
                    } else {
                        router.push("/initial-setup/1");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    useEffect(() => {
        checkHasEnteredInitialInfo();
    }, []);
    return null;
}

export default Page;
