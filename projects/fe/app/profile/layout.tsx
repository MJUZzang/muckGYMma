"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import exampleImage from "@/_images/pooh.jpg";
import FoodPicture from "@/_components/FoodPicture";
import Hash from "@/profile/_components/Hash";
import Grid from "@/profile/_components/Grid";
import ForkKnife from "@/profile/_components/ForkKnife";
import Analytics from "@/profile/_components/Analytics";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Noto_Sans_KR, Dosis } from "next/font/google";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });
const dosis = Dosis({ subsets: ["latin"] });

const Page = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();

    return (
        <div className="mx-auto max-w-[835px] shadow-xl">
            <div className="flex items-center justify-between pr-5 pl-4 mb-4 pt-3">
                {/* User name */}
                <div className="flex items-center gap-1">
                    <Hash className="stroke-app-font-4" size={21} />
                    <p
                        className={`text-lg md:text-xl font-bold ${notoSansKr.className}
                        text-app-font-4`}
                    >
                        jeheecheon
                    </p>
                </div>

                <div className="flex gap-5 items-center">
                    <FoodPicture
                        className="fill-app-font-4 cursor-pointer lg:hidden"
                        size={23}
                    />
                    <FoodPicture
                        className="fill-app-font-4 cursor-pointer hidden lg:block"
                        size={25}
                    />

                    <div className="w-[27px] lg:w-[30px] gap-[4px] flex flex-col cursor-pointer">
                        <div className="w-full h-[2.5px] lg:h-[2.7px] bg-app-font-4 rounded-full" />
                        <div className="w-full h-[2.5px] lg:h-[2.7px] bg-app-font-4 rounded-full" />
                        <div className="w-full h-[2.5px] lg:h-[2.7px] bg-app-font-4 rounded-full" />
                    </div>
                </div>
            </div>

            {/* posts & uploded food images & analytics page */}
            <div className="w-full">
                <div className="flex gap-5 mx-4 mt-3 items-center">
                    <div className="w-fit">

                        <div
                            className="z-[-1] animate-spin-360-slow absolute rounded-full 
                            w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]
                            border-4 border-transparent bg-gradient-to-bl from-yellow-300 via-red-400 to-pink-500 bg-origin-border"
                        />
                        <div
                            className="inline-block overflow-clip rounded-full 
                                w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]
                                border-4 border-transparent"
                        >
                            <Image
                                src={exampleImage}
                                alt="avatar"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2 text-sm text-app-font-2">
                        <div className="flex justify-between w-full">
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    6
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    게시글
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    100
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    팔로잉
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    123
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    팔로워
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    789
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    달성
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    456
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    최장연속
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    123
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    연속달성
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-4 mt-5 text-app-font-2">
                    <p>jeheecheon</p>
                    <p>🇰🇷</p>
                    <p>🔗 www.jeheecheon.com</p>
                </div>

                <div className="flex justify-between items-center mt-3">
                    <Link
                        className={`w-full transition-all duration-1000 border-b-2 ${
                            pathname.includes("profile/posts")
                                ? "border-b-app-font-3"
                                : "border-b-app-bg"
                        }`}
                        href="/profile/posts"
                    >
                        <Grid
                            className={`w-full transition-all duration-1000 ${
                                pathname.includes("/profile/posts")
                                    ? "fill-app-font-3"
                                    : "fill-app-font-5"
                            }`}
                            size={33}
                        />
                    </Link>
                    <Link
                        className={`w-full transition duration-1000 border-b-2 ${
                            pathname.includes("profile/food")
                                ? "border-b-app-font-3"
                                : "border-b-white/0"
                        }`}
                        href="/profile/food"
                    >
                        <ForkKnife
                            className={`w-full transition-all duration-1000 relative top-1 ${
                                pathname.includes("/profile/food")
                                    ? "fill-app-font-3"
                                    : "fill-app-font-5"
                            }`}
                            size={33}
                        />
                    </Link>
                    <Link
                        className={`w-full transition duration-1000 border-b-2 ${
                            pathname.includes("profile/completed")
                                ? "border-b-app-font-3"
                                : "border-b-white/0"
                        }`}
                        href={`/profile/completed`}
                    >
                        <Analytics
                            className={`w-full transition-all duration-1000 ${
                                pathname.includes("/profile/completed")
                                    ? "fill-app-font-3"
                                    : "fill-app-font-5"
                            }`}
                            size={33}
                        />
                    </Link>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Page;
