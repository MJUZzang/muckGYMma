"use client";

import React, { useEffect, useState } from "react";
import ForwardButton from "../_components/ForwardButton";
import ShyCat from "@/initial-setup/2/_images/ShyCat";
import { useRouter } from "next/navigation";

const words =
    "초기 설정을 마쳤어요! 건강한 습관을 만들기 위해 함께 노력해요!";

function Page() {
    const [text, setText] = useState<string>("");
    const router = useRouter();

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
        <div className="flex flex-col h-full">
            <p className="mt-5 inline-block text-white/90 text-2xl leading-9">
                {text}
            </p>
            <div className="space-y-10 mt-auto">
                <ShyCat />

                <ForwardButton
                    title="알겠어!"
                    onClick={() => {
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
