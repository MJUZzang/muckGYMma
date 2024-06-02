import React from "react";

import { Noto_Sans_KR } from "next/font/google";
import Settings from "@/main/analysis/_images/Settings";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

const layout: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    return (
        <>
            <div
                className={`bg-app-bg fixed w-full grid grid-cols-3 items-center py-3 px-5 border-b-[1.5px] border-b-gray-200 z-[50] ${notoSansKr.className}`}
            >
                <div />

                <p className="text-app-font-4 text-sm font-semibold w-full text-center">
                    내 기록
                </p>

                <div className="w-full flex justify-end">
                    <div className="flex flex-col gap-[4px]">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-[4px] w-[4px] bg-app-font-4 rounded-full"
                            />
                        ))}
                    </div>
                </div>
                {/* <div className="w-full ">
                    <Settings className="ml-auto stroke-app-font-3 fill-none rotate-90" />
                </div> */}
            </div>

            <div
                className={`max-w-[835px] mx-auto w-full pt-[60px] ${notoSansKr.className}`}
            >
                <div className="px-5 h-full">{props.children}</div>
            </div>
        </>
    );
};

export default layout;
