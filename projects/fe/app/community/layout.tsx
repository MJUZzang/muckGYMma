"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HeaderTop from "@/_components/HeaderTop";
import LogoAndTitle from "@/_components/LogoAndTitle";

import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"] });

const links = [
    {
        name: "following",
        href: "/community/following",
    },
    {
        name: "hot",
        href: "/community/hot",
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
                <div className="mt-3">
                    <p className={`text-app-font-3 text-2xl font-semibold ${notoSans.className}`}>Community</p>

                </div>

                <div className="flex max-w-[935px] mx-auto w-full mt-3">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            className={`${
                                pathname === link.href
                                    ? "border-b-app-blue border-b-[3px]"
                                    : "hover:border-b-app-blue-5 hover:border-b-[3px]"
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
