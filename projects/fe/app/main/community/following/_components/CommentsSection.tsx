"use client";

import React, { useState } from "react";

import Like from "@/main/community/following/_images/Like";

import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/_components/shadcn/ui/drawer";

import { Button } from "@/_components/shadcn/ui/button";

import exampleImage from "@/_images/pooh.jpg";
import jerry from "@/main/community/following/_images/제리찌르기.jpg";
import shin from "@/main/community/following/_images/김신.jpg";
import gersang from "@/main/community/following/_images/거상.jpg";
import Image from "next/image";
import CommentSectionTextArea from "./CommentSectionTextArea";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

const comments = [
    {
        image: jerry,
        name: "bnad",
        date: "2주 전",
        content: (
            <p>그만 먹어</p>
        ),
        likes: "5,511",
    },
    {
        image: shin,
        name: "xoals1004",
        date: "2주 전",
        content: (
            <p>나도 한 입만...</p>
        ),
        likes: "3",
    },
    {
        image: gersang,
        name: "byungmeo",
        date: "2주 전",
        content: (
            <p>지금 너네집 감 ㅅㄱ</p>
        ),
        likes: "12",
    },
];

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
                    {comments.map((comment, index) => (
                        <div className="gap-3 my-3" key={index}>
                            {/* Comment */}
                            <div className="px-3 flex gap-2">
                                {/* Avatar Image */}
                                    <Image
                                        src={comment.image}
                                        alt="User avatar"
                                        className="w-[50px] h-[50px] rounded-full pointer-events-none"
                                    />

                                {/* Comment Body */}
                                <div className="w-full">
                                    {/* User Name */}
                                    <div className=" flex gap-3 items-center">
                                        <p className="text-app-font-2">
                                            {comment.name}
                                        </p>
                                        <p className="text-white/60 text-[12px]">
                                            {comment.date}
                                        </p>
                                    </div>

                                    {/* Comment Content and Like button */}
                                    <div className="w-full flex">
                                        <p className="w-full text-app-font-2">
                                            {comment.content}
                                        </p>
                                        <div className="flex flex-col items-center absolute right-3">
                                            <Like
                                                onClick={() =>
                                                    setIsLiked(!isLiked)
                                                }
                                                className="fill-red-500"
                                                isLiked={isLiked}
                                            />
                                            <p className="text-app-font-4 text-[12px]">
                                                {comment.likes}
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
