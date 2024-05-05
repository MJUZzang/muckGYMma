"use client";

import { backendUrl } from "@/_utils/urls";
import { useAppDispatch } from "@/../lib/hooks";
import { setIsLoading } from "@/../lib/slices/loadingSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
    const dispatch = useAppDispatch();
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
                    dispatch(setIsLoading(false));

                    if (data.status) {
                        router.push("/");
                    } else {
                        router.push("/initial-setup/1");
                    }
                })
                .catch((err) => {
                    dispatch(setIsLoading(false));
                    console.error(err);
                });
        } else {
            dispatch(setIsLoading(false));
        }
    }

    useEffect(() => {
        checkHasEnteredInitialInfo();
    }, []);
    return null;
}

export default Page;
