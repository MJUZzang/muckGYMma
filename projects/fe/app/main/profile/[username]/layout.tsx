import React from "react";
import Image from "next/image";
import exampleImage from "@/_images/pooh.jpg";
import Hash from "@/main/profile/_components/Hash";

import Link from "next/link";
import { Noto_Sans_KR, Dosis } from "next/font/google";
import UploadMeal from "@/_components/UploadMeal";
import Camera from "@/_images/Camera";
import Nav from "../_components/Nav";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });
const dosis = Dosis({ subsets: ["latin"] });

interface ProfileLayoutProps {
    params: { username: string };
    children?: React.ReactNode;
}

const ProfileLayout = ({ params, children }: Readonly<ProfileLayoutProps>) => {
    console.log(params);
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
                    <UploadMeal
                        className="fill-app-font-4 cursor-pointer lg:hidden"
                        buttonContent={<Camera size={23} />}
                    />
                    <UploadMeal
                        className="fill-app-font-4 cursor-pointer hidden lg:block"
                        buttonContent={<Camera size={25} />}
                    />

                    <Link
                        href="/settings"
                        className="w-[27px] lg:w-[30px] h-fit gap-[4px] flex flex-col cursor-pointer"
                    >
                        <div className="w-full h-[3px] lg:h-[2.7px] bg-app-font-4 rounded-full" />
                        <div className="w-full h-[3px] lg:h-[2.7px] bg-app-font-4 rounded-full" />
                        <div className="w-full h-[3px] lg:h-[2.7px] bg-app-font-4 rounded-full" />
                    </Link>
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
                                    최장달성
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

                <Nav />

                {children}
            </div>
        </div>
    );
};

export default ProfileLayout;
