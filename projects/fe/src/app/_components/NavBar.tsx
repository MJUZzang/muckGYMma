"use client";

import Link from "next/link";
import React from "react";
import Analysis from "@/app/_images/Analytics";
import Camera from "@/app/_images/Camera";
import AccountCircle from "@/app/_images/AccountCircle";
import Workout from "@/app/_images/Workout";
import Forum from "@/app/_images/Forum";

const NavBar = () => {
    return (
        <div className="w-full flex border-t-[0.1px] border-t-gray-200 h-[70px] justify-between items-center">
            <Link
                href="/workout/todos"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <Workout className="dark:fill-white" />
                <p className="text-[10px]">Home</p>
            </Link>

            <Link
                href="/community/following"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <Forum className="dark:fill-white" />
                <p className="text-[10px]">Community</p>
            </Link>

            <div className="bg-orange1 p-3 rounded-full relative bottom-5 cursor-pointer">
                <Camera className="fill-white dark:fill-black"/>
            </div>

            <Link
                href="/analysis"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <Analysis className="dark:fill-white" />
                <p className="text-[10px]">Analysis</p>
            </Link>

            <Link
                href="/profile/me"
                className="flex flex-col items-center justify-between basis-1/5"
            >
                <AccountCircle className="dark:fill-white" />
                <p className="text-[10px]">My</p>
            </Link>
        </div>
    );
};

export default NavBar;
