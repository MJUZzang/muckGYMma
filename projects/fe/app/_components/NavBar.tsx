"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Analysis from "@/_images/Analytics";
import AccountCircle from "@/_images/AccountCircle";
import Workout from "@/_images/Workout";
import Forum from "@/_images/Forum";
import { usePathname } from "next/navigation";
import FoodPicture from "@/_components/FoodPicture";

const excepts = ["/initial-setup", "/plan-info", "/food-info", "/plan"];

const NavBar = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let temp = true;
        for (const except of excepts) {
            if (pathname.includes(except)) {
                temp = false;
                break;
            }
        }
        if (isVisible !== temp) setIsVisible(temp);
    }, [pathname]);

    return (
        <>
            <div className={`pb-[85px] ${!isVisible && "hidden"}`} />
            <div
                className={`absolute max-h-[100dvh] h-full ${
                    !isVisible && "hidden"
                }`}
            >
                <div
                    className={`fixed bg-white/90 bottom-0 w-full flex border-t-[0.1px] h-[60px] pb-3 justify-between items-center`}
                >
                    <Link
                        href="/workout"
                        className="flex flex-col items-center justify-between basis-1/5"
                    >
                        <Workout
                            isActive={pathname.includes("/workout")}
                            className={`${
                                pathname === "/workout"
                                    ? "fill-turkish"
                                    : "fill-gray-500"
                            }`}
                        />
                    </Link>

                    <Link
                        href="/analysis"
                        className="flex flex-col items-center justify-between basis-1/5"
                    >
                        <Analysis
                            className={`${
                                pathname === "/analysis"
                                    ? "fill-turkish stroke-turkish"
                                    : "fill-none stroke-gray-400"
                            }`}
                        />
                    </Link>

                    <div className="bg-turkish-dark p-3 rounded-full relative bottom-5 cursor-pointer">
                        <FoodPicture className="fill-turkish-lighter" />
                    </div>

                    <Link
                        href="/community/following"
                        className="flex flex-col items-center justify-between basis-1/5"
                    >
                        <Forum
                            isActive={pathname === "/community/following"}
                            className={`${
                                pathname === "/community/following"
                                    ? "fill-turkish"
                                    : "fill-gray-400"
                            }`}
                        />
                    </Link>

                    <Link
                        href="/profile/posts"
                        className="flex flex-col items-center justify-between basis-1/5"
                    >
                        <AccountCircle
                            isActive={pathname.includes("/profile/")}
                            className={`${
                                pathname.includes("/profile/")
                                    ? "fill-turkish"
                                    : "fill-gray-400"
                            }`}
                        />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavBar;
