"use client";

import React, { useEffect, useState } from "react";

import Like from "@/main/community/_images/Like";

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
import { backendUrl } from "@/_utils/urls";
import { PostInfo } from "@/_types/PostInfo";
import { CommentInfo, dummyComments } from "@/_types/CommentInfo";
import CatPlaceholder from "./CatPlaceholder";
import { getTimeAgo } from "@/_utils/time";
import { convertCommentsDatesToDate as convertCommentsDatesToDateType } from "@/_utils/comment";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

function CommentsSection({
    children,
    post,
}: Readonly<{
    children: React.ReactNode;
    onClose?: () => void;
    post: PostInfo;
}>) {
    const [text, setText] = useState("");
    const [comments, setComments] = useState<CommentInfo[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    function fetchComments() {
        fetch(`${backendUrl}/api/comments/comments?boardId=${post.id}`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch comments");
                }
            })
            .then((comments: CommentInfo[]) => {
                if (comments) {
                    const converted = convertCommentsDatesToDateType(comments);
                    setComments(converted);
                    setIsFetching(false);
                } else {
                    throw new Error("Failed to fetch comments");
                }
            })
            .catch((err) => {
                console.error(err);
                setIsFetching(false);
                if (process.env.NODE_ENV === "development") {
                    setComments(dummyComments);
                }
            });
    }

    return (
        <Drawer
            closeThreshold={0.9}
            onOpenChange={(isOpen) => {
                if (isOpen) {
                    setIsFetching(true);
                    setTimeout(() => {
                        fetchComments();
                    }, 700);
                } else {
                    setComments([]);
                    setIsFetching(false);
                }
            }}
        >
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
                <div className="overflow-y-auto h-full">
                    {/* 로딩 중일 때 */}
                    {isFetching && (
                        <CatPlaceholder
                            text1="댓글을 로딩 중이에요!"
                            text2="잠시만 기다려주세요..."
                        />
                    )}

                    {/* 댓글이 없을 때 */}
                    {!isFetching && comments.length === 0 && (
                        <CatPlaceholder
                            text1="아직 댓글이 없어요!"
                            text2="첫 번째 댓글을 남겨보세요!"
                        />
                    )}

                    {/* Comments */}
                    {!isFetching && (
                        <div className="space-y-3">
                            {comments.map((comment, index) => (
                                <>
                                    {/* Comment */}
                                    <div
                                        key={comment.id}
                                        className="px-3 flex gap-2"
                                    >
                                        {/* Avatar Image */}
                                        <Image
                                            src={comment.profileImageUrl}
                                            alt="User avatar"
                                            className="h-[45px] w-[45px] rounded-full"
                                            width={50}
                                            height={50}
                                        />

                                        {/* Comment Body */}
                                        <div className="w-full">
                                            {/* User Name */}
                                            <div className=" flex gap-3 items-center">
                                                <p className="text-app-font-2">
                                                    {comment.memberNickname}
                                                </p>
                                                <p className="text-app-font-4 text-[12px]">
                                                    {getTimeAgo(
                                                        comment.createdAt
                                                    )}
                                                </p>
                                            </div>

                                            {/* Comment Content and Like button */}
                                            <div className="w-full flex">
                                                <p className="w-full text-app-font-2">
                                                    {comment.content}
                                                </p>
                                                {/* <div className="flex flex-col items-center">
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
                                                </div> */}
                                            </div>

                                            <div className="flex gap-5 text-xs">
                                                <button
                                                    className="text-app-font-4"
                                                    onClick={() =>
                                                        alert(
                                                            "업데이트 예정 기능입니다."
                                                        )
                                                    }
                                                >
                                                    답글
                                                </button>
                                                <button
                                                    className="text-app-font-4"
                                                    onClick={() =>
                                                        alert(
                                                            "업데이트 예정 기능입니다."
                                                        )
                                                    }
                                                >
                                                    번역
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    )}
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
