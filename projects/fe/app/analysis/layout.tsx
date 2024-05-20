import React from "react";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

const layout: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    return (
        <>
            <div className="fixed w-full grid grid-cols-3 items-center py-3 px-5 bg-app-bg-3 shadow-xl border-b-2 bg-opacity-100 z-[50]">
                <div />
                <p className="text-app-font-3 text-sm font-bold w-full text-center">
                    눈바디
                </p>
                <div className="w-full flex justify-end">
                    <div className="flex flex-col gap-[4px]">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-[4.5px] w-[4.5px] bg-app-font-4 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={`max-w-[835px] mx-auto w-full ${notoSansKr.className}`}
            >
                <div className="space-y-4 h-full">
                    <div className="px-3">{props.children}</div>
                </div>
            </div>
        </>
    );
};

export default layout;
