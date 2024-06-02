import XButton from "@/_images/XButton";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import React from "react";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

function PostLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { postId: number };
}>) {
    console.log(params);
    return (
        <>
            <div
                className={`grid grid-cols-3 px-2 h-[55px] bg-app-bg border-b-[1px] border-b-app-bg-2 ${notoSansKr.className}`}
            >
                <Link
                    href="/"
                    className="w-full inline-flex justify-start items-center"
                >
                    <XButton className="stroke-app-font-3 z-[10] cursor-pointer" size={33} />
                </Link>

                <div className="w-full flex items-center justify-center font-semibold text-base text-app-font-3">
                    새 포스트 작성
                </div>

                <div className="w-full flex justify-end items-center"></div>
            </div>

            {children}
        </>
    );
}

export default PostLayout;
