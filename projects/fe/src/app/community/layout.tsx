"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface CommunityLayoutProps {
    children?: React.ReactNode;
}

const CommunityLayout: React.FC<CommunityLayoutProps> = (props) => {
    const pathname = usePathname();

    return (
        <>
            <div
                className="fixed px-3 py-1 w-full flex flex-col items-center border-b-2 text-2xl
                bg-white dark:bg-black z-10"
            >
                <div className="flex justify-start w-full">
                    <p>Community</p>
                    <div></div>
                </div>

                <nav className="w-full">
                    <ul className="w-full flex justify-start gap-3 text-sm">
                        <li>
                            <Link
                                className={`${
                                    pathname === "/community/following" &&
                                    "border-b-[3px]"
                                } pb-1 border-b-green-600`}
                                href="/community/following"
                            >
                                Following
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${
                                    pathname === "/community/hot" &&
                                    "border-b-[3px]"
                                } pb-1 border-b-green-600`}
                                href="/community/hot"
                            >
                                Hot
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${
                                    pathname === "/community/club" &&
                                    "border-b-[3px]"
                                } pb-1 border-b-green-600`}
                                href="/community/club"
                            >
                                Club
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Spacer for Header */}
            <div className="w-[1px] h-[70px]" />

            {props.children}
        </>
    );
};

export default CommunityLayout;
