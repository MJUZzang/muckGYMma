"use client";

import ArrowBack from "@/_images/ArrowBack";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const pages = [
    {
        order: 0,
        title: "",
        progress: "5%",
    },
    {
        order: 1,
        title: "WELCOME!",
        progress: "10%",
    },
    {
        order: 2,
        title: "Workout Experience",
        progress: "15%",
    },
    {
        order: 3,
        title: "Workout Frequency",
        progress: "30%",
    },
    {
        order: 4,
        title: "Workout Goal",
        progress: "40%",
    },
    {
        order: 5,
        title: "Body Data",
        progress: "50%",
    },
    {
        order: 6,
        title: "Body Data",
        progress: "60%",
    },
    {
        order: 7,
        title: "Workout Experience",
        progress: "70%",
    },
    {
        order: 8,
        title: "Workout Experience",
        progress: "80%",
    },
    {
        order: 9,
        title: "Workout Experience",
        progress: "90%",
    },
    {
        order: 10,
        title: "Finished!",
        progress: "100%",
    },
];

function InitialSetupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const router = useRouter();

    const [pageInfo, setPageInfo] = useState(pages[0]);

    useEffect(() => {
        setPageInfo(pages[parseInt(pathname.split("/")?.[2]) - 1]);
    }, [pathname]);

    return (
        <div className="absolute w-full max-h-[100vh] h-[100vh] z-[30] default-bg px-5 pb-[85px]">
            <div className="mt-3">
                {pageInfo.order !== 0 && (
                    <ArrowBack
                        className="fill-white/80 absolute"
                        onClick={() => router.back()}
                    />
                )}
                <p className="inline-block w-full text-center text-white/90">
                    {pageInfo.title}
                </p>
            </div>

            {/* Progress bar */}
            <div className="h-[5px] rounded-full mt-5 bg-stone-800">
                <div
                    className={`transition-all h-full bg-fluorescent rounded-full`}
                    style={{
                        width: pageInfo.progress,
                    }}
                />
            </div>

            {children}
        </div>
    );
}

export default InitialSetupLayout;
