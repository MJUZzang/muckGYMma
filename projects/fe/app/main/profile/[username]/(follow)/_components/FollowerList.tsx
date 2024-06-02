"use client";

import React, { useState } from "react";
import { FollowerInfo } from "@/main/profile/[username]/(follow)/_types/follow";
import { Noto_Sans_KR } from "next/font/google";
import Image from "next/image";
import { backendUrl } from "@/_utils/urls";
import { useAppSelector } from "@/../lib/hooks";
import { selectNickname } from "@/../lib/slices/userInfoSlice";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });

interface FollowerListProps {
    followers: FollowerInfo[];
}

function FollowerList({ followers }: FollowerListProps) {
    const [followerList, setFollowerList] = useState<FollowerInfo[]>(followers);
    const myNickname = useAppSelector(selectNickname);

    function handleButtonClick(follower: FollowerInfo) {
        fetch(`${backendUrl}/api/follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                followerNickname: myNickname,
                followeeNickname: follower.nickname,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to unfollow the user");
                }
            })
            .then((data: { isFollowing: boolean }) => {
                if (!data) {
                    throw new Error("Failed to unfollow the user");
                }
                if (!data.isFollowing) {
                    setFollowerList((prev) => {
                        return prev.filter((prevFollower) => {
                            return prevFollower.nickname !== follower.nickname;
                        });
                    });
                } else {
                    throw new Error("Failed to unfollow the user");
                }
            });
    }

    return (
        <div className={`space-y-2 px-3 pt-2 ${notoSansKr.className}`}>
            {followers.map((follower, index) => {
                return (
                    <div key={index} className="flex items-center space-x-2">
                        {/* Avatar Image */}
                        <div className="w-[45px] h-[45px]">
                            <div className="w-[45px] h-[45px] overflow-clip rounded-full">
                                <Image
                                    src={follower.profileImageUrl}
                                    alt="User avatar"
                                    className="w-[45px] h-[45px] pointer-events-none"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <p className="text-app-font-2">
                                {follower.nickname}
                            </p>
                            <p className="text-xs text-app-font-4">
                                {follower.email}
                            </p>
                        </div>

                        <button
                            className="text-nowrap text-sm rounded-lg px-3 py-1 border-2"
                            onClick={() => {
                                handleButtonClick(follower);
                            }}
                        >
                            삭제
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default FollowerList;
