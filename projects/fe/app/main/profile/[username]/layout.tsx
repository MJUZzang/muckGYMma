import React from "react";
import Image from "next/image";
import exampleImage from "@/_images/pooh.jpg";
import Hash from "@/main/profile/_components/Hash";

import Link from "next/link";
import { Noto_Sans_KR, Dosis, Cookie } from "next/font/google";
import UploadMeal from "@/_components/UploadMeal";
import Camera from "@/_images/Camera";
import Nav from "@/main/profile/_components/Nav";
import Interaction from "@/main/profile/_components/Interaction";
import { backendUrl } from "@/_utils/urls";
import { cookies } from "next/headers";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });
const dosis = Dosis({ subsets: ["latin"] });

interface ProfileLayoutProps {
    params: { username: string };
    children?: React.ReactNode;
}

interface ProfileInfo {
    nickname: string;
    postCount: number;
    followingCount: number;
    followerCount: number;
    content: string | null;
    profileImageUrl: string;
    totalClearDay: number;
    longestClearDay: number;
    nowClearDay: number;
}

async function fetchProfileInfo(username: string) {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/profile?nickname=${username}`, {
        method: "GET",
        credentials: "include",
        headers: {
            Cookie: cookieStore
                .getAll()
                .map((cookie) => {
                    return `${cookie.name}=${cookie.value}`;
                })
                .join("; "),
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Sever responsded with an error");
            }
        })
        .then((data: ProfileInfo) => {
            if (!data) {
                throw new Error("Failed to fetch user profile");
            }
            return data;
        })
        .catch((err) => {
            console.error(err);
            const dummyProfileInfo: ProfileInfo = {
                nickname: "jeheecheon",
                postCount: 6,
                followingCount: 100,
                followerCount: 123,
                content: "jeheecheon",
                profileImageUrl: exampleImage.src,
                totalClearDay: 789,
                longestClearDay: 456,
                nowClearDay: 123,
            };
            return dummyProfileInfo;
        });
}

async function ProfileLayout({
    params,
    children,
}: Readonly<ProfileLayoutProps>) {
    const nickname = params.username;
    const profile = await fetchProfileInfo(nickname);
    console.log(nickname);
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
                        {nickname}
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
                                src={profile.profileImageUrl}
                                alt="avatar"
                                width={140}
                                height={140}
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
                                    {profile.postCount}
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    게시글
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    {profile.followingCount}
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    팔로잉
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    {profile.followerCount}
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
                                    {profile.totalClearDay}
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    달성
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    {profile.longestClearDay}
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    최장달성
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <p
                                    className={`font-semibold ${dosis.className}`}
                                >
                                    {profile.nowClearDay}
                                </p>
                                <p className={`${notoSansKr.className}`}>
                                    연속달성
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Interaction profileUsername={nickname} className="mt-2" />

                <div className="mx-4 mt-5 text-app-font-2">
                    {profile.content && (
                        <p className={`${notoSansKr.className}`}>
                            {profile.content}
                        </p>
                    )}
                </div>

                <Nav nickname={nickname} />

                {children}
            </div>
        </div>
    );
}

export default ProfileLayout;
