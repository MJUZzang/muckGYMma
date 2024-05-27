"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Noto_Sans, Dosis } from "next/font/google";
import Image from "next/image";

const notoSans = Noto_Sans({ subsets: ["latin"] });
const dosis = Dosis({ subsets: ["latin"] });

const links = [
    {
        name: "Following",
        href: "/main/community/following",
    },
    {
        name: "Hot",
        href: "/main/community/hot",
    },
    {
        name: "Club",
        href: "/main/community/club",
    },
];

interface CommunityLayoutProps {
    children?: React.ReactNode;
}

const CommunityLayout: React.FC<CommunityLayoutProps> = (props) => {
    const pathname = usePathname();

    return (
        <>
            <div className="flex flex-col border-b-[1px] border-b-gray-300 px-3">
                <div className="mt-3 max-w-[835px] mx-auto w-full">
                    <Image src="/android-chrome-192x192.png" alt="app logo" width={100} height={100} />
                </div>

                <div className="flex max-w-[835px] mx-auto w-full mt-3 gap-4">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            className={`${
                                pathname === link.href
                                    ? "border-b-app-blue-3 border-b-[3px] text-app-font-3"
                                    : "hover:border-b-app-blue-5 text-app-font-5"
                            } ${
                                notoSans.className
                            } w-fit text-center text-[15px] pb-1 px-1
                                transition-colors duration-1000 ease-in-out`}
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="h-full">{props.children}</div>
        </>
    );
};

export default CommunityLayout;
