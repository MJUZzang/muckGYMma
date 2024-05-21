import XButton from "@/_images/XButton";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import React from "react";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

function PostLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div
                className={`grid grid-cols-3 px-2 h-[45px] shadow-md ${notoSansKr.className}`}
            >
                <Link href="/workout" className="w-full flex justify-start items-center">
                    <XButton className="stroke-app-font-3" size={33} />
                </Link>
                <div className="w-full flex items-center justify-center text-sm text-app-font-3">
                    새 포스트 작성
                </div>
                <div className="w-full flex justify-end items-center"></div>
            </div>
            {children}
        </>
    );
}

export default PostLayout;
