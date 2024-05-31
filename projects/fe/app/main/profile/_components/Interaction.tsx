"use client";

import React, { useEffect } from "react";
import { useAppSelector } from "@/../lib/hooks";
import { selectNickname } from "@/../lib/slices/userInfoSlice";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });

interface InteractionProps {
    profileUsername: string;
    className?: string;
}

function Interaction({ profileUsername, className }: InteractionProps) {
    const myNickname = useAppSelector(selectNickname);

    useEffect(() => {});

    return (
        <div
            className={`px-3 grid grid-cols-2 gap-3 text-sm font-semibold text-app-font-4 ${notoSansKr} ${className}`}
        >
            <div className="w-full text-center py-1 bg-app-bg rounded-lg border-[1.4px] border-gray-300">
                팔로우
            </div>
            <div className="w-full text-center py-1 bg-app-bg rounded-lg border-[1.4px] border-gray-300">
                메시지
            </div>
        </div>
    );
}

export default Interaction;
