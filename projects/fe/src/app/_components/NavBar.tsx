import Link from "next/link";
import React from "react";
import Home from "@/app/_images/Home";
import Analytics from "@/app/_images/Analytics";
import Camera from "../_images/Camera";
import AccountCircle from "../_images/AccountCircle";

const NavBar = () => {
    return (
        <div className="w-full flex border-t-[1px] h-[70px] justify-evenly items-center">
            <Link href="/home" className="flex flex-col items-center">
                <Home className="dark:fill-white" />
                <p className="text-sm">Home</p>
            </Link>
            <Link href="/analytics" className="flex flex-col items-center">
                <Analytics className="dark:fill-white" />
                <p className="text-sm">Analytics</p>
            </Link>
            <Link href="/food" className="flex flex-col items-center">
                <Camera className="dark:fill-white" />
                <p className="text-sm">Food</p>
            </Link>
            <Link href="/profile/me" className="flex flex-col items-center">
                <AccountCircle className="dark:fill-white" />
                <p className="text-sm">My</p>
            </Link>
        </div>
    );
};

export default NavBar;
