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
                <div className="mt-3 max-w-[935px] mx-auto w-full">
                    <p
                        className={`text-app-font-3 text-2xl font-semibold ${dosis.className}`}
                    >
                        Community
                    </p>
                </div>

                <div className="flex max-w-[935px] mx-auto w-full mt-3">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            className={`${
                                pathname === link.href
                                    ? "border-b-app-blue border-b-[3px]"
                                    : "hover:border-b-app-blue-5 border-b-[3px]"
                            } ${
                                notoSans.className
                            } w-[90px] text-center text-app-font-3 text-sm pb-1
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
