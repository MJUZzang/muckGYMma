"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Analysis from "@/_images/Analytics";
import AccountCircle from "@/_images/AccountCircle";
import Workout from "@/_images/Workout";
import Forum from "@/_images/Forum";
import { usePathname } from "next/navigation";
import { Noto_Sans_KR } from "next/font/google";
import Camera from "@/_images/Camera";
import UploadMenu from "@/_components/UploadMenu";
import { useAppSelector } from "@/../lib/hooks";
import { selectNickname } from "@/../lib/slices/userInfoSlice";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

const excepts = [
    "/initial-setup",
    "/plan-info",
    "/meal/info",
    "/plan",
    "/meal/prediction/pick",
    "/settings",
    "/post",
];

const NavBar = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [showUploadMenu, setShowUploadMenu] = useState(false);

    const nickname = useAppSelector(selectNickname);

    useEffect(() => {
        let temp = true;
        for (const except of excepts) {
            if (pathname.startsWith(except)) {
                temp = false;
                break;
            }
        }
        if (isVisible !== temp) setIsVisible(temp);
    }, [pathname]);

    return (
        <>
            <div
                className={`pb-[85px] ${!isVisible && "hidden"} ${
                    pathname.startsWith("/main/community") && "bg-app-bg-1"
                }`}
            />
            <div
                className={`absolute max-h-[100dvh] h-full ${
                    !isVisible && "hidden"
                }`}
            >
                <div
                    className={`fixed bg-app-bg bottom-0 w-full flex boxshadow h-[65px] pb-4 justify-between items-center
                    shadow-[-1px_0px_6px_1px_rgba(0,0,0,0.1)]`}
                >
                    <Link
                        href="/main/workout"
                        className="flex flex-col items-center justify-between basis-1/5"
                    >
                        <Workout
                            isActive={pathname.includes("/main/workout")}
                            className={`${
                                pathname === "/main/workout"
                                    ? "fill-app-blue"
                                    : "fill-gray-600"
                            }`}
                        />
                        <p
                            className={`text-[0.6rem] ${
                                pathname === "/main/workout"
                                    ? "text-app-blue"
                                    : "text-gray-600"
                            }
                            ${notoSansKr.className}`}
                        >
                            운동
                        </p>
                    </Link>

                    <Link
                        href="/main/analysis"
                        className="flex flex-col items-center justify-between basis-1/5"
                    >
                        <Analysis
                            className={`${
                                pathname === "/main/analysis"
                                    ? "fill-app-blue stroke-app-blue"
                                    : "fill-none stroke-gray-600"
                            }`}
                        />
                        <p
                            className={`text-[0.6rem] ${
                                pathname === "/main/analysis"
                                    ? "text-app-blue"
                                    : "text-gray-600"
                            }
                            ${notoSansKr.className}`}
                        >
                            내 기록
                        </p>
                    </Link>

                    <div
                        className="shadow-md shadow-gray-400 bg-app-blue p-3 rounded-full relative bottom-5 cursor-pointer"
                        onClick={() => setShowUploadMenu(!showUploadMenu)}
                    >
                        <UploadMenu
                            isVisible={showUploadMenu}
                            className={`absolute bottom-[56px]`}
                        />

                        <Camera className="fill-app-bg" size={31} />

                        {/* <FoodPicture className="fill-app-bg" /> */}
                    </div>

                    <Link
                        href="/main/community/following"
                        className="flex flex-col items-center justify-between basis-1/5"
                    >
                        <Forum
                            isActive={pathname === "/main/community/following"}
                            className={`${
                                pathname === "/main/community/following"
                                    ? "fill-app-blue"
                                    : "fill-gray-600"
                            }`}
                            dotsColor="fill-app-bg"
                        />
                        <p
                            className={`text-[0.6rem] ${
                                pathname === "/main/community/following"
                                    ? "text-app-blue"
                                    : "text-gray-600"
                            } 
                            ${notoSansKr.className}`}
                        >
                            커뮤니티
                        </p>
                    </Link>

                    <Link
                        href={`/main/profile/${nickname}/posts`}
                        className="flex flex-col items-center justify-between basis-1/5"
                    >
                        <AccountCircle
                            isActive={pathname.startsWith("/main/profile/")}
                            className={`${
                                pathname.startsWith("/main/profile/")
                                    ? "stroke-app-blue fill-app-blue"
                                    : "stroke-gray-600/75 fill-none"
                            }`}
                        />
                        <p
                            className={`text-[0.6rem] ${
                                pathname.startsWith("/main/profile")
                                    ? "text-app-blue"
                                    : "text-gray-600"
                            }
                            ${notoSansKr.className}`}
                        >
                            프로필
                        </p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavBar;
