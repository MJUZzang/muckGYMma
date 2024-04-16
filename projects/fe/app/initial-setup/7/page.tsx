"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ForwardButton from "@/initial-setup/_components/ForwardButton";

function Page() {
    const [selectedGender, setSelectedGender] = useState<number | null>(null);
    const router = useRouter();

    return (
        <div className="text-white/90 h-full flex flex-col">
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
                        className="bg-white/15 rounded-lg py-1 pr-3 w-[150px] text-center
                        focus:outline-1 focus:outline-fluorescent-lightest"
                    />
                </label>
                <label className="flex justify-between mt-5">
                    체중
                    <div className="flex flex-col items-end">
                        <input
                            type="number"
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
                        router.push("/initial-setup/8");
                    }, 500);
                }}
                title="다음"
                className="mt-auto"
            />
        </div>
    );
}

export default Page;
