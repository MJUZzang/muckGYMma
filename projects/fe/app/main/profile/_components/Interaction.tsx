"use client";

import React, { useMemo } from "react";
import { Noto_Sans_KR } from "next/font/google";
import { backendUrl } from "@/_utils/urls";
import { useAppSelector } from "../../../../lib/hooks";
import { selectNickname } from "../../../../lib/slices/userInfoSlice";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });

interface InteractionProps {
    className?: string;
    isFollowing: boolean;
    profileUsername: string;
}

function Interaction({
    className,
    isFollowing,
    profileUsername,
}: InteractionProps) {
    const myNickname = useAppSelector(selectNickname);
    const isMe = useMemo(() => myNickname === profileUsername, [myNickname, profileUsername])
    const [followed, setFollowed] = React.useState<boolean>(isFollowing);

    function handleFollowClicked() {
        fetch(`${backendUrl}/api/follow`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickname: profileUsername,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to follow");
                }
            })
            .then((data) => {
                if (!data) {
                    throw new Error("Failed to follow");
                } else {
                    return data;
                }
            });
    }

    return (
        <div
            className={`px-3 grid grid-cols-2 gap-3 text-sm font-semibold text-app-font-4 ${
                isMe && "hidden"
            } ${notoSansKr} ${className}`}
        >
            <button
                onClick={handleFollowClicked}
                className="w-full text-center py-1 bg-app-bg rounded-lg border-[1.4px] border-gray-300"
            >
                {followed ? "Following" : "Unfollow"}
            </button>
            <button
                onClick={() => alert("업데이트 예정 기능입니다.")}
                className="w-full text-center py-1 bg-app-bg rounded-lg border-[1.4px] border-gray-300"
            >
                메시지
            </button>
        </div>
    );
}

export default Interaction;
