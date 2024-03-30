"use client";

import Link from "next/link";
import React from "react";
import Analysis from "@/app/_images/Analytics";
import Camera from "@/app/_images/Camera";
import AccountCircle from "@/app/_images/AccountCircle";
import Workout from "@/app/_images/Workout";
import Forum from "@/app/_images/Forum";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const pathname = usePathname();

    return (
        <div className="w-full flex border-t-[0.1px] border-t-gray-200 h-[70px] justify-between items-center">
            <Link
                href="/workout/todo"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <Workout
                    isActive={pathname === "/workout/todo"}
                    className={`${
                        pathname === "/workout/todo"
                            ? "fill-orange1"
                            : "fill-gray-800"
                    }`}
                />
                <p
                    className={`text-[10px]
                    ${
                        pathname === "/workout/todo"
                            ? "text-orange1 font-semibold"
                            : "text-gray-800"
                    }`}
                >
                    Home
                </p>
            </Link>

            <Link
                href="/community/following"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <Forum
                    isActive={pathname === "/community/following"}
                    className={`${
                        pathname === "/community/following"
                            ? "fill-orange1"
                            : "fill-gray-800"
                    }`}
                />
                <p
                    className={`text-[10px]
                    ${
                        pathname === "/community/following"
                            ? "text-orange1 font-semibold"
                            : "text-gray-800"
                    }`}
                >
                    Community
                </p>
            </Link>

            <div className="bg-orange1 p-3 rounded-full relative bottom-5 cursor-pointer">
                <Camera className="fill-white dark:fill-black" />
            </div>

            <Link
                href="/analysis"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <Analysis
                    className={`${
                        pathname === "/analysis"
                            ? "fill-orange1 stroke-orange1"
                            : "fill-none stroke-gray-800"
                    }`}
                />
                <p
                    className={`text-[10px]
                    ${
                        pathname === "/analysis"
                            ? "text-orange1 font-semibold"
                            : "text-gray-800"
                    }`}
                >
                    Analysis
                </p>
            </Link>

            <Link
                href="/profile/me"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <AccountCircle
                    isActive={pathname === "/profile/me"}
                    className={`${
                        pathname === "/profile/me"
                            ? "fill-orange1"
                            : "fill-gray-800"
                    }`}
                />
                <p
                    className={`text-[10px]
                    ${
                        pathname === "/profile/me"
                            ? "text-orange1 font-semibold"
                            : "text-gray-800"
                    }`}
                >
                    My
                </p>
            </Link>
        </div>
    );
};

export default NavBar;
