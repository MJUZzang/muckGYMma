"use client";

import Link from "next/link";
import React from "react";
import Analytics from "@/app/_images/Analytics";
import Camera from "@/app/_images/Camera";
import AccountCircle from "@/app/_images/AccountCircle";
import Workout from "@/app/_images/Workout";
import Forum from "@/app/_images/Forum";

const links = [
    {
        href: "/workout",
        Icon: Workout,
        text: "Workout",
    },
    {
        href: "/community/following",
        Icon: Forum,
        text: "Community",
    },
    {
        href: "/food",
        Icon: Camera,
        text: "Add Image",
    },
    {
        href: "/analysis",
        Icon: Analytics,
        text: "Analysis",
    },
    {
        href: "/profile/me",
        Icon: AccountCircle,
        text: "My",
    },
];

const NavBar = () => {
    return (
        <div className="w-full flex border-t-[1px] h-[70px] justify-between items-center">
            {links.map(({ href, Icon, text }) => (
                <Link
                    key={href}
                    href={href}
                    className="flex flex-col items-center basis-1/5"
                >
                    <Icon className="dark:fill-white" />
                    <p className="text-xs">{text}</p>
                </Link>
            ))}
            
        </div>
    );
};

export default NavBar;
