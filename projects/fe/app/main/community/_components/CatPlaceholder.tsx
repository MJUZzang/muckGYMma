import Shycat from "@/_images/Shycat";
import { Noto_Sans_KR } from "next/font/google";
import React from "react";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

interface CatPlaceholderProps {
    text1: string;
    text2: string;
}

function CatPlaceholder({ text1, text2 }: CatPlaceholderProps) {
    return (
        <div
            className={`w-full overflow-hidden animate-page-fade-in flex items-center h-full ${notoSansKr.className}`}
        >
            <div className="w-full flex flex-col justify-start">
                <div className="max-w-[400px] mx-auto w-full">
                    <Shycat />
                </div>

                <div
                    className="w-[80vw] max-w-[600px] text-center mx-auto text-[1.08rem] animate-pulse
                                    text-app-font-4"
                >
                    <p>{text1}</p>
                    <p className="text-sm">{text2}</p>
                </div>
            </div>
        </div>
    );
}

export default CatPlaceholder;
