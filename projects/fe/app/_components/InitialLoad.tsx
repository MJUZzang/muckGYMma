"use client";

import { backendUrl } from "@/_utils/urls";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { setUserInfo, userInfoState } from "../../lib/slices/userInfoSlice";
import { useAppDispatch } from "../../lib/hooks";

interface InitialLoadProps {
    children: React.ReactNode;
}

function InitialLoad(props: InitialLoadProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(true);

    function checkIsLogedIn() {
        if (true) {
            // if (process.env.NODE_ENV !== "development") {
            fetch(`${backendUrl}/api/member/setup`, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("Failed to fetch user info");
                    }
                })
                .then((data: userInfoState) => {
                    if (data) {
                        console.log(data);
                        dispatch(setUserInfo(data));
                        setIsLoading(false);
                    } else {
                        throw new Error("Failed to fetch user info");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        checkIsLogedIn();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[100dvh] animate-pulse">
                    <div
                        className="w-[40px] h-[40px] rounded-full border-t-stone-200 border-t-4 border-4 border-stone-400 
                        animate-spin"
                    />
                    <div className="animate-bounce mt-3">
                        <p className="text-app-font-2">Welcome to 먹짐마!</p>
                    </div>
                </div>
            ) : (
                props.children
            )}
        </>
    );
}

export default InitialLoad;
