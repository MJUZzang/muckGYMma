"use client";

import React from "react";
import HeaderTop from "@/app/_components/HeaderTop";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "To do",
        href: "/workout/todo",
    },
    {
        name: "Completed",
        href: "/workout/completed",
    },
];

interface WorkoutLayoutProps {
    children: React.ReactNode;
}

const WorkoutLayout: React.FC<WorkoutLayoutProps> = (props) => {
    const pathname = usePathname();

    return (
        <>
            <HeaderTop className="flex-col pb-2 space-y-2 shadow">
                <div className="flex flex-col w-full">
                    <p className="text-orange1">Exercise</p>
                    <div className="text-gray-500 text-sm">
                        Pick up a task and start excercing
                    </div>
                </div>
                <nav className="w-full">
                    <ul className="flex justify-center text-sm rounded-lg bg-[#efeded]">
                        {links.map((link, index) => (
                            <li
                                key={index}
                                className={`basis-1/2 text-center py-2 
                                ${
                                    pathname === link.href
                                        ? "bg-orange1 text-white rounded-lg"
                                        : ""
                                }`}
                            >
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </HeaderTop>

            {/* Spacer for Header */}
            <div className="w-[1px] h-[120px]" />

            <div className="mx-4">
                <div className="bg-white dark:bg-gray-700 h-full">
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default WorkoutLayout;
