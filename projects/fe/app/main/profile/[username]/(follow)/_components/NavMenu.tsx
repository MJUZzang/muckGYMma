"use client";

import { get } from "http";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavMenuProps {
    username: string;
    followersCount: number;
    followingCount: number;
}

function NavMenu({ followersCount, followingCount, username }: NavMenuProps) {
    const pathname = usePathname();

    function getBorderStyle(path: string) {
        if (pathname.includes(path) && pathname.includes("/main/profile")) {
            return "border-app-font-5";
        } else {
            return "border-gray-100";
        }
    }

    function getFontStyle(path: string) {
        if (pathname.includes(path) && pathname.includes("/main/profile")) {
            return "text-app-font-2";
        } else {
            return "text-app-font-5";
        }
    }
    return (
        <div className="grid grid-cols-3 text-sm">
            <Link
                href={`/main/profile/${username}/followers`}
                className={`pb-2 text-center border-b-2 ${getFontStyle("/followers")} ${getBorderStyle(
                    "/followers"
                )}`}
            >
                {followersCount} 팔로워
            </Link>
            <Link
                href={`/main/profile/${username}/following`}
                className={`pb-2 text-center border-b-2 ${getFontStyle("/following")} ${getBorderStyle(
                    "/following"
                )}`}
            >
                {followingCount} 팔로잉
            </Link>
            <button
                onClick={() => alert("업데이트 예정 기능입니다.")}
                className={`pb-2 text-center border-b-2 ${getFontStyle("/subscription")} ${getBorderStyle(
                    "/subscription"
                )}`}
            >
                구독
            </button>
        </div>
    );
}

export default NavMenu;
