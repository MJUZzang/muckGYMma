import React from "react";

import KakaoSymbol from "@/app/sign-in/_images/KakaoSymbol";
import GoogleSymbol from "@/app/sign-in/_images/GoogleSymbol";
import GoogleLoginButton from "./_components/GoogleLoginButton";
import KakaoLoginButton from "./_components/KakaoLoginButton";

const page = () => {
    return (
        <main
            className="absolute w-screen h-screen overflow-y-auto bg-[#212121] dark:bg-[#050505]
              px-4"
        >
            <div className="h-1/2 flex flex-col justify-end">
                <div className="italic font-extrabold text-2xl text-white">
                    <p>AI - Powered</p>
                    <p>Workout Coaching</p>
                    <p>Tailored To You</p>
                </div>
                <p className="text-gray-300 text-sm py-5">
                    Get personalized plan in 1 min.
                </p>
            </div>
            <div className="h-1/2 flex flex-col justify-between">
                <div className="space-y-4">
                    <KakaoLoginButton />
                    <GoogleLoginButton />
                </div>

                <div className="text-gray-400 flex flex-col items-center gap-2 text-xs mb-6">
                    <p>By logging in, you agree to the terms below.</p>
                    <div className="flex justify-center gap-10 underline underline-offset-2">
                        <p>Privacy Policy</p>
                        <p>Terms of Use</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;
