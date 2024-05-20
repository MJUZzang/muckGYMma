import React from "react";
import Logo from "@/_components/Logo";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"]
})

const layout: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    return (
        <div className={`max-w-[835px] mx-auto w-full ${notoSansKr.className}`}>
            <div className="px-3 space-y-4 h-full">
                <p className="text-app-font-3 text-3xl font-bold">Analysis</p>
                {props.children}
            </div>
        </div>
    );
};

export default layout;
