"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ForwardButton from "@/initial-setup/_components/ForwardButton";
import { useAppDispatch, useAppSelector } from "@/../lib/hooks";
import {
    selectInitialInfo,
    setBirthDate,
    setHeight,
    setWeight,
} from "../../../lib/slices/initialInfoSlice";
import ConfirmModal from "@/initial-setup/_components/ConfirmModal";

function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const initialInfo = useAppSelector(selectInitialInfo);
    const [isModelOpen, setIsModalOpen] = useState(false);

    return (
        <div className="text-white/90 h-full flex flex-col animate-page-enter">
            <p className="mt-5 text-xl text-pretty">
                체중/신장과 생년월일을 알려주세요!
            </p>
            <p className="mt-2 text-xs">
                운동 플랜 생성에 사용되며 공유되지 않습니다
            </p>

            <div className="mt-7">
                <label className="flex justify-between">
                    생년월일
                    <input
                        type="date"
                        onInput={(e) => {
                            dispatch(
                                setBirthDate(
                                    e.currentTarget.value.replace(/-/g, ".")
                                )
                            );
                        }}
                        className="bg-white/15 rounded-lg py-1 pr-3 w-[150px] text-center
                        focus:outline-1 focus:outline-fluorescent-lightest"
                    />
                </label>
                <label className="flex justify-between mt-5">
                    체중
                    <div className="flex flex-col items-end">
                        <input
                            type="number"
                            onInput={(e) => {
                                dispatch(
                                    setWeight(parseInt(e.currentTarget.value))
                                );
                            }}
                            className="bg-white/15 rounded-lg py-1 pr-3 w-[110px] text-center
                            focus:outline-1 focus:outline-fluorescent-lightest"
                        />
                        <p className="relative text-red z-[50] right-3 bottom-[27px]">
                            kg
                        </p>
                    </div>
                </label>
                <label className="flex justify-between">
                    신장
                    <div className="flex flex-col items-end">
                        <input
                            type="number"
                            onInput={(e) => {
                                dispatch(
                                    setHeight(parseInt(e.currentTarget.value))
                                );
                            }}
                            className="bg-white/15 rounded-lg py-1 pr-3 w-[110px] text-center
                            focus:outline-1 focus:outline-fluorescent-lightest"
                        />
                        <p className="relative text-red z-[50] right-3 bottom-[27px]">
                            cm
                        </p>
                    </div>
                </label>
            </div>

            <ForwardButton
                onClick={() => {
                    setTimeout(() => {
                        if (
                            initialInfo.physicalSetting.birth ||
                            initialInfo.physicalSetting.weight ||
                            initialInfo.physicalSetting.height
                        ) {
                            router.push("/initial-setup/8");
                        } else {
                            setIsModalOpen(true);
                        }
                    }, 500);
                }}
                title="다음"
                className={`${
                    (!initialInfo.physicalSetting.birth ||
                        !initialInfo.physicalSetting.weight ||
                        !initialInfo.physicalSetting.height) &&
                    "bg-fluorescent/75 text-black/80 hover:bg-fluorescent/90"
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
