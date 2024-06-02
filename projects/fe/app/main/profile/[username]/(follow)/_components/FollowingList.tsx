"use client";

import React, { useState } from "react";
import { FollowingInfo } from "../_types/follow";
import Image from "next/image";
import { Noto_Sans_KR } from "next/font/google";
import { useAppSelector } from "../../../../../../lib/hooks";
import { selectNickname } from "../../../../../../lib/slices/userInfoSlice";
import { backendUrl } from "@/_utils/urls";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });

interface FollowingListProps {
    followings: FollowingInfo[];
}

function FollowingList({ followings }: FollowingListProps) {
    const [followingList, setFollowingList] =
        useState<FollowingInfo[]>(followings);
    const myNickname = useAppSelector(selectNickname);

    function handleButtonClick(following: FollowingInfo) {
        fetch(`${backendUrl}/api/follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                followerNickname: myNickname,
                followeeNickname: following.nickname,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch followers");
                }
            })
            .then((data: { isFollowing: boolean }) => {
                if (!data) {
                    throw new Error("Failed to fetch followers");
                }
                if (data.isFollowing) {
                    setFollowingList((prev) => {
                        return prev.map((prevFollowing) => {
                            if (prevFollowing.nickname === following.nickname) {
                                return {
                                    ...prevFollowing,
                                    justUnfollowed: false,
                                };
                            }
                            return prevFollowing;
                        });
                    });
                } else {
                    setFollowingList((prev) => {
                        return prev.map((prevFollowing) => {
                            if (prevFollowing.nickname === following.nickname) {
                                return {
                                    ...prevFollowing,
                                    justUnfollowed: true,
                                };
                            }
                            return prevFollowing;
                        });
                    });
                }
            });
    }

    return (
        <div className={`space-y-2 px-3 pt-2 ${notoSansKr.className}`}>
            {followingList.map((following, index) => {
                return (
                    <div key={index} className="flex items-center space-x-2">
                        {/* Avatar Image */}
                        <div className="w-[45px] h-[45px]">
                            <div className="w-[45px] h-[45px] overflow-clip rounded-full">
                                <Image
                                    src={following.profileImageUrl}
                                    alt="User avatar"
                                    className="w-[45px] h-[45px] pointer-events-none"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <p className="text-app-font-2">
                                {following.nickname}
                            </p>
                            <p className="text-xs text-app-font-4">
                                {following.email}
                            </p>
                        </div>

                        <button
                            className="text-nowrap text-sm rounded-lg px-3 py-1 border-2"
                            onClick={() => {
                                handleButtonClick(following);
                            }}
                        >
                            {following.justUnfollowed ? "팔로우" : "팔로잉"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default FollowingList;
