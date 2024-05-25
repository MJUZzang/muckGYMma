import Shycat from "@/_images/Shycat";
import { Noto_Sans_KR } from "next/font/google";
import React from "react";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

function Loading() {
    return (
        <div
            className={`absolute top-0 left-0 w-full overflow-hidden animate-page-fade-in flex items-center h-[100dvh] ${notoSansKr.className}`}
        >
            <div className="w-full flex flex-col justify-start">
                <div className="max-w-[400px] mx-auto w-full">
                    <Shycat />
                </div>

                <div
                    className="w-[80vw] max-w-[600px] text-center mx-auto text-[1.08rem] animate-pulse
                    text-app-font-4"
                >
                    <p>꾸미가 운동 플랜을 만드는 중이에요!</p>
                    <p className="text-sm">잠시만 기다려주세요!</p>
                </div>
            </div>
        </div>
    );
}

export default Loading;
