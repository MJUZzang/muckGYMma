"use client";

import React, { useEffect } from "react";
import LogoAndTitle from "@/_components/LogoAndTitle";
import Settings from "@/profile/_images/Settings";
import Image from "next/image";
import exampleImage from "@/_images/pooh.jpg";
import FoodPicture from "@/_components/FoodPicture";
import Hash from "@/profile/_components/Hash";
import Grid from "@/profile/_components/Grid";
import ForkKnife from "@/profile/_components/ForkKnife";
import Analytics from "@/profile/_components/Analytics";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Page = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();

    return (
        <>
            <div>
                <div className="mx-auto max-w-[935px] flex items-center justify-between px-3 mt-2 lg:mt-4 mb-4">
                    {/* User name */}
                    <div className="flex items-center gap-1">
                        <Hash strokeColor="#cccccc" size={21} />
                        <p className="text-[#dddddd] text-lg md:text-xl lg:text-2xl font-bold">
                            jeheecheon
                        </p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <FoodPicture
                            className="fill-white cursor-pointer lg:hidden"
                            size={23}
                        />
                        <FoodPicture
                            className="fill-white cursor-pointer hidden lg:block"
                            size={30}
                        />

                        <div className="w-[27px] lg:w-[33px] gap-[4.5px] flex flex-col cursor-pointer">
                            <div className="w-full h-[2.5px] lg:h-[3px] bg-white rounded-full" />
                            <div className="w-full h-[2.5px] lg:h-[3px] bg-white rounded-full" />
                            <div className="w-full h-[2.5px] lg:h-[3px] bg-white rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* posts & uploded food images & analytics page */}
            <div className="w-full max-w-[935px] mx-auto">
                <div className="flex gap-5 mx-4 mt-3 items-center">
                    <div className="w-fit">
                        <div
                            className="inline-block overflow-clip rounded-full 
                            w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px]
                            border-2 border-gray-600"
                        >
                            <Image
                                src={exampleImage}
                                alt="avatar"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2 text-sm">
                        <div className="flex text-white/90 justify-between w-full">
                            <div className="w-full flex flex-col items-center">
                                <p>6</p>
                                <p className="font-semibold">게시글</p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p>6</p>
                                <p className="font-semibold">팔로잉</p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p>6</p>
                                <p className="font-semibold">팔로워</p>
                            </div>
                        </div>
                        <div className="flex text-white/90 justify-between w-full">
                            <div className="w-full flex flex-col items-center">
                                <p>6</p>
                                <p className="font-semibold">달성</p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p>6</p>
                                <p className="font-semibold">최장연속</p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p>6</p>
                                <p className="font-semibold">연속달성</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-4 mt-5">
                    <p className="text-white">jeheecheon</p>
                    <p className="text-white">🇰🇷</p>
                    <p className="text-white">🔗 www.jeheecheon.com</p>
                </div>

                <div className="flex justify-between items-center mt-3">
                    <Link
                        className={`w-full transition duration-200 border-b-2 ${
                            pathname.includes("profile/posts")
                                ? "border-b-white"
                                : "border-b-white/0"
                        }`}
                        href="/profile/posts"
                    >
                        <Grid
                            className={`w-full`}
                            color={`${
                                pathname.includes("/profile/posts")
                                    ? "white"
                                    : "#aaaaaa"
                            }`}
                            size={33}
                        />
                    </Link>
                    <Link
                        className={`w-full transition duration-200 border-b-2 ${
                            pathname.includes("profile/food")
                                ? "border-b-white"
                                : "border-b-white/0"
                        }`}
                        href="/profile/food"
                    >
                        <ForkKnife
                            className="w-full relative top-1"
                            color={`${
                                pathname.includes("/profile/food")
                                    ? "white"
                                    : "#aaaaaa"
                            }`}
                            size={33}
                        />
                    </Link>
                    <Link
                        className={`w-full transition duration-200 border-b-2 ${
                            pathname.includes("profile/completed")
                                ? "border-b-white"
                                : "border-b-white/0"
                        }`}
                        href={`/profile/completed`}
                    >
                        <Analytics
                            className="w-full"
                            color={`${
                                pathname.includes("/profile/completed")
                                    ? "white"
                                    : "#aaaaaa"
                            }`}
                            size={33}
                        />
                    </Link>
                </div>

                {children}
            </div>
        </>
    );
};

export default Page;
