"use client";

import React, { useEffect, useState } from "react";
import ForwardButton from "@/initial-setup/_components/ForwardButton";
import PlayfulCat from "@/_images/PlayfulCat";
import { useRouter } from "next/navigation";
import { selectUserInfo } from "@/../lib/slices/userInfoSlice";
import { useAppSelector } from "@/../lib/hooks";
import { backendUrl } from "@/_utils/urls";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

const words = "초기 설정을 마쳤어요! 건강한 습관을 만들기 위해 함께 노력해요!";

function Page() {
    const [text, setText] = useState<string>("");
    const router = useRouter();
    const initialInfo = useAppSelector(selectUserInfo);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText((prev) => {
                let text = "";
                for (let j = 0; j <= i; j++) {
                    text += words[j];
                }
                return text;
            });

            i++;
            if (i === words.length - 1) {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`flex flex-col h-full animate-page-enter ${notoSansKr.className}`}
        >
            <p className="mt-5 inline-block text-app-font-2 text-2xl leading-9">
                {text}
            </p>
            <div className="space-y-10 mt-auto">
                <PlayfulCat />

                <ForwardButton
                    title="알겠어!"
                    onClick={() => {
                        fetch(`${backendUrl}/api/member/setup`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(initialInfo),
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error("Failed to set up");
                                }
                            })
                            .catch((err) => {
                                console.error(err);
                            });

                        setTimeout(() => {
                            router.push("/");
                        }, 500);
                    }}
                />
            </div>
        </div>
    );
}

export default Page;
