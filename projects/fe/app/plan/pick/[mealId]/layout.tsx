import ArrowBack from "@/_images/ArrowBack";
import { Noto_Sans_KR } from "next/font/google";
import React from "react";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

interface PickLayoutProps {
    children?: React.ReactNode;
}

function PickLayout({ children }: PickLayoutProps) {
    return (
        <div className={`pt-4 px-3 ${notoSansKr.className}`}>
            <div className="grid grid-cols-3">
                <ArrowBack className="fill-app-font-2" />

                <p className="text-lg w-full text-center font-semibold">
                    운동계획 선택
                </p>
            </div>

            {children}
        </div>
    );
}

export default PickLayout;
