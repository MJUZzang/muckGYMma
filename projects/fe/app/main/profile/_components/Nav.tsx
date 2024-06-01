"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

import Grid from "@/main/profile/_components/Grid";
import ForkKnife from "@/main/profile/_components/ForkKnife";
import Analytics from "@/main/profile/_components/Analytics";

interface NavProps {
    nickname: string;
}

function Nav({ nickname }: NavProps) {
    const pathname = usePathname();

    return (
        <div className="flex justify-between items-center mt-3">
            <Link
                className={`w-full transition-all duration-1000 border-b-2 ${
                    pathname.includes("/profile") && pathname.includes("/posts")
                        ? "border-b-app-font-3"
                        : "border-b-app-bg"
                }`}
                href={`/main/profile/${nickname}/posts`}
            >
                <Grid
                    className={`w-full transition-all duration-1000 ${
                        pathname.includes("/profile") &&
                        pathname.includes("/posts")
                            ? "fill-app-font-3"
                            : "fill-app-font-5"
                    }`}
                    size={33}
                />
            </Link>
            <Link
                className={`w-full transition duration-1000 border-b-2 ${
                    pathname.includes("/profile") && pathname.includes("/meals")
                        ? "border-b-app-font-3"
                        : "border-b-white/0"
                }`}
                href={`/main/profile/${nickname}/meals`}
            >
                <ForkKnife
                    className={`w-full transition-all duration-1000 relative top-1 ${
                        pathname.includes("/profile") &&
                        pathname.includes("/meals")
                            ? "fill-app-font-3"
                            : "fill-app-font-5"
                    }`}
                    size={33}
                />
            </Link>
            <Link
                className={`w-full transition duration-1000 border-b-2 ${
                    pathname.includes("/profile") &&
                    pathname.includes("/completed")
                        ? "border-b-app-font-3"
                        : "border-b-white/0"
                }`}
                href={`/main/profile/${nickname}/completed`}
            >
                <Analytics
                    className={`w-full transition-all duration-1000 ${
                        pathname.includes("/profile") &&
                        pathname.includes("/completed")
                            ? "fill-app-font-3"
                            : "fill-app-font-5"
                    }`}
                    size={33}
                />
            </Link>
        </div>
    );
}

export default Nav;
