"use client";
import { Lilita_One } from "next/font/google";

import React from "react";
import HeaderTop from "@/app/_components/HeaderTop";
import Link from "next/link";
import Logo from "@/app/_images/logo.png";
import { usePathname } from "next/navigation";
import Image from "next/image";

const lilitaOne = Lilita_One({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

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
            {/* <HeaderTop className="flex-col pb-2 space-y-2 shadow">
                <div className="flex flex-col w-full">
                    <p className="text-orange1 text-left">Exercise</p>
                    <div className="text-gray-500 text-sm text-left">
                        Pick up a task and start excercing
                    </div>
                </div>
                <nav className="w-full">
                    <ul className="flex justify-center text-sm rounded-lg">
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
            </HeaderTop> */}

            <div className="flex items-center p-3">
                <Image src={Logo} alt="Logo" width={78} />
                <div
                    className={`flex items-end text-white text-xl ${lilitaOne.className}
                    relative top-1`}
                >
                    <p>muck</p>
                    <p className="text-fluorescent text-2xl">GYM</p>
                    <p>ma</p>
                </div>
            </div>

            <nav className="w-full px-3 space-y-5">
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
                            <Link className="w-full h-full inline-block py-2" href={link.href}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mx-4">
                <div className="h-full">{props.children}</div>
            </div>
        </>
    );
};

export default WorkoutLayout;
