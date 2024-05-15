"use client";

import React, { useState } from "react";

import Like from "@/community/following/_images/Like";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/_components/shadcn/ui/drawer";

import { Button } from "@/_components/shadcn/ui/button";

import exampleImage from "@/_images/pooh.jpg";
import Image from "next/image";
import CommentSectionTextArea from "./CommentSectionTextArea";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

function CommentsSection({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [text, setText] = useState("");
    const [isLiked, setIsLiked] = useState<boolean>(false);

    return (
        <Drawer closeThreshold={0.9}>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="h-[80dvh] bg-app-bg border-none focus:outline-none">
                <DrawerHeader>
                    <DrawerTitle
                        className={`text-app-font-2 text-base ${notoSansKr.className}`}
                    >
                        Comments
                        <div className="mt-2 absolute -left-[10vw] w-[110vw] border-b-[1.5px] border-b-app-font-6/85" />
                    </DrawerTitle>
                    {/* <DrawerDescription>
                        This action cannot be undone.
                    </DrawerDescription> */}
                </DrawerHeader>

                {/* Drawber body */}
                <div className="overflow-y-auto">
                    {/* Comments */}
                    {Array.from({ length: 15 }).map((_, index) => (
                        <div className="gap-3 my-3" key={index}>
                            {/* Comment */}
                            <div className="px-3 flex gap-2">
                                {/* Avatar Image */}
                                <div className="w-[50px] h-[50px] rounded-full overflow-clip">
                                    <Image
                                        src={exampleImage}
                                        alt="User avatar"
                                        width={50}
                                        height={50}
                                    />
                                </div>

                                {/* Comment Body */}
                                <div className="w-full">
                                    {/* User Name */}
                                    <div className=" flex gap-3 items-center">
                                        <p className="text-app-font-2">
                                            Jehee Cheon
                                        </p>
                                        <p className="text-white/60 text-[12px]">
                                            2주 전
                                        </p>
                                    </div>

                                    {/* Comment Content and Like button */}
                                    <div className="w-full flex">
                                        <p className="w-full text-app-font-2">
                                            This is a comment...먹짐마 데모
                                            코멘트 내용에 뭘 넣을까여
                                        </p>
                                        <div className="flex flex-col items-center">
                                            <Like
                                                onClick={() =>
                                                    setIsLiked(!isLiked)
                                                }
                                                className="fill-red-500"
                                                isLiked={isLiked}
                                            />
                                            <p className="text-app-font-4 text-[12px]">
                                                2,462
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5 text-xs">
                                        <button className="text-app-font-4">
                                            답글
                                        </button>
                                        <button className="text-app-font-4">
                                            번역
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <DrawerFooter>
                    <div className="flex mx-2 gap-2 pb-2 pt-2">
                        {/* Avatar Image */}
                        <div className="w-[43px] h-[43px] rounded-full overflow-clip">
                            <Image
                                src={exampleImage}
                                alt="User avatar"
                                width={43}
                                height={43}
                            />
                        </div>

                        <CommentSectionTextArea text={text} setText={setText} />
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default CommentsSection;
