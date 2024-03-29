"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HeaderTop from "@/app/_components/HeaderTop";

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
            <HeaderTop className="flex-col">
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
            </HeaderTop>
            
            {/* Spacer for Header */}
            <div className="w-[1px] h-[70px]" />

            {props.children}
        </>
    );
};

export default CommunityLayout;
