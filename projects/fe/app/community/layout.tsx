"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Noto_Sans, Dosis } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"] });
const dosis = Dosis({ subsets: ["latin"] });

const links = [
    {
        name: "Following",
        href: "/community/following",
    },
    {
        name: "Hot",
        href: "/community/hot",
    },
    {
        name: "Club",
        href: "/community/club",
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
                    <p
                        className={`text-app-blue-darker-1 text-2xl font-semibold ${dosis.className}`}
                    >
                        Community
                    </p>
                </div>

                <div className="flex max-w-[835px] mx-auto w-full mt-3 gap-4">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            className={`${
                                pathname === link.href
                                    ? "border-b-app-blue border-b-[3px] text-app-font-3"
                                    : "hover:border-b-app-blue-5 text-app-font-5"
                            } ${
                                notoSans.className
                            } w-fit text-center text-base pb-1 px-1
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
