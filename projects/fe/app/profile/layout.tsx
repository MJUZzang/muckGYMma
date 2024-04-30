"use client";

import React from "react";
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
            <div className="flex items-center justify-between mx-5 mt-2 mb-4">
                {/* User name */}
                <div className="flex items-center gap-1">
                    <Hash strokeColor="#cccccc" size={21} />
                    <p className="text-[#dddddd] text-lg font-bold">
                        jeheecheon
                    </p>
                </div>

                <div className="flex gap-5 items-center">
                    <FoodPicture className="fill-white" size={23} />

                    <div className="w-[27px] gap-[4.5px] flex flex-col">
                        <div className="w-full h-[2.5px] bg-white rounded-full" />
                        <div className="w-full h-[2.5px] bg-white rounded-full" />
                        <div className="w-full h-[2.5px] bg-white rounded-full" />
                    </div>
                </div>
            </div>

            {/* posts & uploded food images & analytics page */}
            <div className="w-full max-w-[935px] mx-auto">
                <div className="flex gap-5 mx-4 mt-3 items-center">
                    <div className="w-fit">
                        <div
                            className="inline-block overflow-clip rounded-full w-[68px] h-[68px]
                            lg:w-[140px] lg:h-[140px]
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
                                <p className="font-semibold">최장</p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p>6</p>
                                <p className="font-semibold">연속달성</p>
                            </div>
                        </div>
                    </div>

                    {/* 
                    <div className="flex flex-col text-white gap-3">
                        <p className="text-xl">jeheecheon</p>

                        <div className="flex gap-4">
                            <div className="px-4 py-1 bg-[#363636] rounded-md text-nowrap">
                                Edit profile
                            </div>
                            <div className="px-4 py-1 bg-[#363636] rounded-md text-nowrap">
                                View archive
                            </div>
                        </div>
                    </div> */}
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
                        className={`w-full border-b-2 ${
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
                        className={`w-full border-b-2 ${
                            pathname.includes("profile/analytics")
                                ? "border-b-white"
                                : "border-b-white/0"
                        }`}
                        href={`/profile/analytics`}
                    >
                        <Analytics
                            className="w-full"
                            color={`${
                                pathname.includes("/profile/analytics")
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
