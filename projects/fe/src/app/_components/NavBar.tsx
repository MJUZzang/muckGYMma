"use client";

import Link from "next/link";
import React from "react";
import Analytics from "@/app/_images/Analytics";
import Camera from "@/app/_images/Camera";
import AccountCircle from "@/app/_images/AccountCircle";
import Workout from "@/app/_images/Workout";
import Forum from "@/app/_images/Forum";

const NavBar = () => {
    return (
        <div className="w-full flex border-t-[1px] h-[70px] justify-between items-center">
            <Link href="/workout" className="flex flex-col items-center basis-1/5">
                <Workout className="dark:fill-white" />
                <p className="text-xs">Workout</p>
            </Link>

            <Link href="/community/following" className="flex flex-col items-center basis-1/5">
                <Forum className="dark:fill-white" />
                <p className="text-xs">Community</p>
            </Link>

            <Link href="/food" className="flex flex-col items-center basis-1/5">
                <Camera className="dark:fill-white" />
                <p className="text-xs">Add Image</p>
            </Link>

            <Link
                href="/analysis"
                className="flex flex-col items-center basis-1/5"
            >
                <Analytics className="dark:fill-white" />
                <p className="text-xs">Analysis</p>
            </Link>

            <Link
                href="/profile/me"
                className="flex flex-col items-center basis-1/5"
            >
                <AccountCircle className="dark:fill-white" />
                <p className="text-xs">My</p>
            </Link>
        </div>
    );
};

export default NavBar;
