"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ForwardButton from "@/initial-setup/_components/ForwardButton";
import { useAppDispatch, useAppSelector } from "@/../lib/hooks";
import { selectUserInfo, setNickname } from "../../../lib/slices/userInfoSlice";
import ConfirmModal from "@/initial-setup/_components/ConfirmModal";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const initialInfo = useAppSelector(selectUserInfo);
    const [isModelOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className={`text-app-font-2 h-full flex flex-col animate-page-enter ${notoSansKr.className}`}
        >
            <p className="mt-5 text-xl text-pretty">
                사용하실 유저이름을 입력해주세요
            </p>
            <p className="mt-2 text-xs">
                커뮤니티에서 운동일기를 작성할 때 사용됩니다
            </p>

            <div className="mt-7">
                <label className="flex justify-between mt-5">
                    유저이름
                    <div className="flex flex-col items-end">
                        <input
                            type="text"
                            onInput={(e) => {
                                dispatch(setNickname(e.currentTarget.value));
                            }}
                            className="bg-app-bg-1 rounded-lg py-1 pr-3 w-[110px] text-center
                            focus:outline-1 focus:outline-app-blue-1 peer"
                        />
                    </div>
                </label>
            </div>

            <ForwardButton
                onClick={() => {
                    setTimeout(() => {
                        if (
                            initialInfo.nickname &&
                            initialInfo.nickname !== ""
                        ) {
                            router.push("/initial-setup/12");
                        } else {
                            setIsModalOpen(true);
                        }
                    }, 500);
                }}
                title="다음"
                className={`${
                    !initialInfo.nickname &&
                    initialInfo.nickname === "" &&
                    "bg-app-blue/65 text-app-inverted-font hover:bg-app-blue/90"
                }`}
            />

            <ConfirmModal
                isVisible={isModelOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default Page;
