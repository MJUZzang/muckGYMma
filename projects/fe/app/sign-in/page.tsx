import React from "react";

import GoogleLoginButton from "@/sign-in/_components/GoogleLoginButton";
import KakaoLoginButton from "@/sign-in/_components/KakaoLoginButton";
import { Jua, Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});
const jua = Jua({
    subsets: ["latin"],
    weight: ["400"],
});

const page = () => {
    return (
        <main
            className={`absolute w-screen h-screen bg-[#212121] z-10 ${notoSansKr.className}`}
        >
            <div className="px-4 max-w-[500px] w-full h-full mx-auto">
                <div className="h-1/2 flex flex-col justify-end pb-[10vh]">
                    <div className="italic font-extrabold text-white">
                        <div className="rotate-3">
                            <p className="text-sm">운동+식단 관리는</p>
                            <p className={`-mt-[2px] text-sm ${jua.className}`}>
                                AI - Powered
                            </p>
                        </div>

                        <div
                            className={`w-fit mx-auto flex items-end text-[40px] sm:text-[46px] ${jua.className}`}
                        >
                            muck{" "}
                            <p className="text-app-blue text-[43px] sm:text-[48px]">
                                GYM
                            </p>{" "}
                            ma&nbsp;
                        </div>
                        <p
                            className={`w-fit -rotate-3 text-xs ml-auto ${notoSansKr.className}`}
                        >
                            먹짐말라구!
                        </p>
                    </div>
                </div>

                <div className="h-1/2 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mt-6 mb-6">
                            <div className="w-full border-t-2 border-app-font-5" />
                            <p className="text-app-font-5 text-xs text-nowrap">
                                로그인 & 회원가입
                            </p>
                            <div className="w-full border-t-2 border-app-font-5" />
                        </div>
                        <div className="space-y-4">
                            <KakaoLoginButton />
                            <GoogleLoginButton />
                        </div>
                    </div>

                    <div className="text-gray-400 flex flex-col items-center gap-2 text-xs mb-6">
                        <p>By logging in, you agree to the terms below.</p>
                        <ul className="flex justify-center gap-10 underline underline-offset-2">
                            <button className="cursor-pointer">
                                Privacy Policy
                            </button>
                            <button className="cursor-pointer">
                                Terms of Use
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;
