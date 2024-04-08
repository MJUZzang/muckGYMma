"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HeaderTop from "@/_components/HeaderTop";
import LogoAndTitle from "@/_components/LogoAndTitle";

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
            {/* <HeaderTop className="flex-col">
                <div className="flex justify-start w-full">
                    <p>Community</p>
                    <div></div>
                </div>

                <nav className="w-full">
                    <ul className="w-full flex justify-start gap-3 text-sm">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    className={`${
                                        pathname === link.href &&
                                        "border-b-[3px]"
                                    } pb-1 border-b-green-600`}
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </HeaderTop> */}

            {/* Spacer for Header */}
            {/* <div className="w-[1px] h-[70px]" /> */}

            <div className="flex flex-col mb-3 border-b-[1px] border-b-gray-700">
                <div className="flex items-center">
                    <LogoAndTitle />
                </div>
                <div className="flex">
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

            {props.children}
        </>
    );
};

export default CommunityLayout;
