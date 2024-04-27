"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoAndTitle from "@/_components/LogoAndTitle";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/_components/shadcn/ui/drawer";

import { Button } from "@/_components/shadcn/ui/button";

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
            <div className="flex items-center">
                <LogoAndTitle />
            </div>

            <nav className="w-full px-3 space-y-5 mt-1">
                <p className="text-white text-3xl font-bold">Task list</p>
                <ul className="flex justify-center text-sm rounded-lg bg-[#202020]">
                    {links.map((link, index) => (
                        <li
                            key={index}
                            className={`basis-1/2 text-center
                                ${
                                    pathname === link.href
                                        ? "bg-fluorescent text-black font-semibold rounded-lg"
                                        : "text-white font-semibold"
                                }`}
                        >
                            <Link
                                className="py-2 w-full h-full inline-block"
                                href={link.href}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="px-4">{props.children}</div>
        </>
    );
};

export default WorkoutLayout;
