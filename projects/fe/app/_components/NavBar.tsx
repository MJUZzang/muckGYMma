"use client";

import Link from "next/link";
import React from "react";
import Analysis from "@/_images/Analytics";
import Camera from "@/_images/Camera";
import AccountCircle from "@/_images/AccountCircle";
import Workout from "@/_images/Workout";
import Forum from "@/_images/Forum";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const pathname = usePathname();

    return (
        <div className="w-full flex border-t-[0.1px] border-t-gray-700 h-[60px] justify-between items-center">
            <Link
                href="/workout/todo"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <Workout
                    isActive={pathname.includes("/workout")}
                    className={`${
                        pathname === "/workout/todo"
                            ? "fill-fluorescent"
                            : "fill-gray-200"
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
                            ? "fill-fluorescent stroke-fluorescent"
                            : "fill-none stroke-gray-200"
                    }`}
                />
            </Link>

            <div className="bg-fluorescent p-3 rounded-full relative bottom-5 cursor-pointer">
                <Camera className="fill-gray-900" />
            </div>

            <Link
                href="/community/following"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <Forum
                    isActive={pathname === "/community/following"}
                    className={`${
                        pathname === "/community/following"
                            ? "fill-fluorescent"
                            : "fill-gray-200"
                    }`}
                />
            </Link>

            <Link
                href="/profile/me"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <AccountCircle
                    isActive={pathname === "/profile/me"}
                    className={`${
                        pathname === "/profile/me"
                            ? "fill-fluorescent"
                            : "fill-gray-200"
                    }`}
                />
            </Link>
        </div>
    );
};

export default NavBar;
