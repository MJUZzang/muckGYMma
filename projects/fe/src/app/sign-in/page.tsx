import React from "react";

import GoogleLoginButton from "./_components/GoogleLoginButton";
import KakaoLoginButton from "./_components/KakaoLoginButton";

const page = () => {
    return (
        <main className="absolute w-screen h-screen overflow-y-auto bg-[#212121] dark:bg-[#050505]">
            <div className="px-4 max-w-[500px] w-full h-full mx-auto">
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
                        <ul className="flex justify-center gap-10 underline underline-offset-2">
                            <button className="cursor-pointer">Privacy Policy</button>
                            <button className="cursor-pointer">Terms of Use</button>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;
