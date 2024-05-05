"use client";

import { backendUrl } from "@/_utils/urls";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const excepts = ["/sign-in", "/initial-setup"];

interface InitialLoadProps {
    children: React.ReactNode;
}

function InitialLoad(props: InitialLoadProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    function checkIsLogedIn() {
        if (process.env.NODE_ENV !== "development") {
            fetch(`${backendUrl}/api/login/check`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
                next: {
                    revalidate: 0,
                },
            })
                .then((res) => {
                    if (res.ok) {
                        console.log("222");
                        checkHasEnteredInitialInfo();
                    } else {
                        console.log("333");
                        setLoading(false);
                        router.push("/sign-in");
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.error(err);
                });
        } else {
            setLoading(false);
        }
    }

    function checkHasEnteredInitialInfo() {
        if (process.env.NODE_ENV !== "development") {
            fetch(`${backendUrl}/api/member/initialized`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
                next: {
                    revalidate: 0,
                },
            })
                .then((res) => {
                    if (res.ok) {
                        console.log("444");
                        return res.json();
                    } else {
                        console.log("555");
                        throw new Error("Sever responsded with an error");
                    }
                })
                .then((data) => {
                    setLoading(false);
                    console.log("666");

                    if (!data.initialized) {
                        console.log("777");
                        router.push("/initial-setup/1");
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.error(err);
                });
        } else {
            setLoading(false);
        }
    }

    // useEffect(() => {
        let shouldBeExcepted = false;
        for (const except of excepts) {
            if (pathname.startsWith(except)) {
                shouldBeExcepted = true;
                break;
            }
        }

        if (shouldBeExcepted) {
            setLoading(false);
        } else {
            console.log("111");
            checkIsLogedIn();
        }
    // }, []);

    return (
        <>
            {loading ? (
                <div className="flex flex-col items-center justify-center h-full max-h-[100dvh] animate-pulse">
                    <div
                        className="w-[40px] h-[40px] rounded-full border-t-stone-200 border-t-4 border-4 border-stone-400 
                        animate-spin"
                    />
                    <div className="animate-bounce mt-3">
                        <p className="text-white/90">Welcome to 먹짐마!</p>
                    </div>
                </div>
            ) : (
                props.children
            )}
        </>
    );
}

export default InitialLoad;
