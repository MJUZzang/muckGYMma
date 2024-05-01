"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HeaderTop from "@/_components/HeaderTop";
import LogoAndTitle from "@/_components/LogoAndTitle";

import { Jua, Dosis } from "next/font/google";

const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});
const dosis = Dosis({ subsets: ["latin"] });

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
        <div className="">
            <div className="flex flex-col border-b-[1px] border-b-gray-700">
                <div className="flex items-center max-w-[935px] mx-auto w-full">
                    <LogoAndTitle />
                </div>
                <div className="flex max-w-[935px] mx-auto w-full">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            className={`${
                                pathname === link.href
                                    ? "border-b-fluorescent border-b-[3px]"
                                    : "hover:border-b-gray-300 hover:border-b-[3px]"
                            } w-[90px] text-center text-gray-300 hover:text-gray-100`}
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="h-full">{props.children}</div>
        </div>
    );
};

export default CommunityLayout;
