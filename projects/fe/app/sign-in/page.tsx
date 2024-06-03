import React from "react";

import GoogleLoginButton from "@/sign-in/_components/GoogleLoginButton";
import KakaoLoginButton from "@/sign-in/_components/KakaoLoginButton";
import { Jua, Noto_Sans_KR } from "next/font/google";

import logo from "@/_images/logo_with_name.png";
import Image from "next/image";

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
            className={`absolute w-screen h-[100dvh] bg-app-bg z-30 ${notoSansKr.className}`}
        >
            <div className="px-4 max-w-[500px] w-full h-full mx-auto">
                <div className="h-1/2 flex flex-col justify-end pb-[6vh]">
                    <div className="w-fit mx-auto">
                        <Image src={logo} alt="logo" width={186} height={186} />
                    </div>
                </div>

                <div className="h-1/2 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mt-6 mb-6">
                            <div className="w-full border-t-[1px] border-app-font-5" />
                            <p className="text-app-font-3 text-xs text-nowrap">
                                로그인 & 회원가입
                            </p>
                            <div className="w-full border-t-[1px] border-app-font-5" />
                        </div>
                        <div className="space-y-4">
                            {/* <KakaoLoginButton /> */}
                            <GoogleLoginButton />
                        </div>
                    </div>

                    <div className="text-gray-500 flex flex-col items-center gap-2 text-xs mb-6">
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
