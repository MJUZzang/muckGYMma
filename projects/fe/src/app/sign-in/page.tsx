import React from "react";

import KakaoSymbol from "@/app/sign-in/_images/KakaoSymbol";
import GoogleSymbol from "@/app/sign-in/_images/GoogleSymbol";

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
                    <div className="bg-[#FEE500] text-sm font-[500] px-4 w-full flex items-center rounded-[5px] py-2">
                        <KakaoSymbol />
                        <p className="w-full text-center text-black/85">
                            Continue with Kakao
                        </p>
                    </div>

                    <div className="bg-[#FEFEFE] text-sm font-[500] px-4 w-full flex items-center rounded-[4px] py-2">
                        <GoogleSymbol />
                        <p className="w-full text-center text-black/85">
                            Continue with Google
                        </p>
                    </div>
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
