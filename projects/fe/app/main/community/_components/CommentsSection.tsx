"use client";

import React, { useEffect, useState } from "react";

import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/_components/shadcn/ui/drawer";

import Image from "next/image";
import CommentSectionTextArea from "./CommentSectionTextArea";
import { Noto_Sans_KR } from "next/font/google";
import { backendUrl } from "@/_utils/urls";
import { PostInfo } from "@/_types/PostInfo";
import { CommentInfo, dummyComments } from "@/_types/CommentInfo";
import CatPlaceholder from "./CatPlaceholder";
import { getTimeAgo } from "@/_utils/time";
import {
    convertCommentsDatesToDate as convertCommentsDatesToDateType,
    sortCommnetsByDate,
} from "@/_utils/comment";
import { useAppSelector } from "../../../../lib/hooks";
import { selectNickname } from "../../../../lib/slices/userInfoSlice";

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

    const [modifyingId, setModifyingId] = useState(0);
    const myNickname = useAppSelector(selectNickname);

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
                    const sorted = sortCommnetsByDate(converted);
                    setComments(sorted);
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

    function deleteComment(commentId: number) {
        fetch(`${backendUrl}/api/comments/delete`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                commentId,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    setIsFetching(true);
                    setTimeout(() => {
                        fetchComments();
                    }, 700);
                } else {
                    throw new Error("Failed to delete comment");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function onSubmitComment() {
        if (modifyingId) {
            fetch(`${backendUrl}/api/comments/update`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    commentId: modifyingId,
                    content: text,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        setIsFetching(true);
                        setText("");
                        setModifyingId(0);
                        setTimeout(() => {
                            fetchComments();
                        }, 700);
                    } else {
                        throw new Error("Failed to update comment");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            fetch(`${backendUrl}/api/comments/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    boardId: post.id,
                    content: text,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        setIsFetching(true);
                        setText("");
                        setTimeout(() => {
                            fetchComments();
                        }, 700);
                    } else {
                        throw new Error("Failed to create comment");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
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
                <div
                    className={`overflow-y-auto h-full ${notoSansKr.className}`}
                >
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
                    {!isFetching && comments.length > 0 && (
                        <div className="space-y-3">
                            {comments.map((comment, index) => (
                                <>
                                    {/* Comment */}
                                    <div
                                        key={comment.id}
                                        className="px-3 flex gap-3"
                                    >
                                        {/* Avatar Image */}
                                        <div className="w-[45px] h-[45px]">
                                            <div className="w-[45px] h-[45px] overflow-clip rounded-full">
                                                <Image
                                                    src={
                                                        comment.profileImageUrl
                                                    }
                                                    alt="User avatar"
                                                    className="w-[45px] h-[45px] pointer-events-none"
                                                    width={43}
                                                    height={43}
                                                />
                                            </div>
                                        </div>

                                        {/* Comment Body */}
                                        <div className="w-full space-y-1">
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

                                                {myNickname ===
                                                    comment.memberNickname && (
                                                    <div className="ml-auto flex relative">
                                                        <ul
                                                            className={`comment-menu flex text-sm flex-col py-2 absolute right-7 rounded-xl bg-app-bg-1 text-app-font-3 gap-1 px-2 ${
                                                                !comment.isMenuOpen &&
                                                                "hidden"
                                                            }`}
                                                        >
                                                            <button
                                                                className="comment-menu w-full text-center px-3 text-nowrap"
                                                                onClick={() => {
                                                                    setModifyingId(
                                                                        comment.id
                                                                    );
                                                                    setText(
                                                                        comment.content
                                                                    );
                                                                }}
                                                            >
                                                                수정하기
                                                            </button>
                                                            <div className="comment-menu bg-app-bg-3 h-[2px]" />
                                                            <button
                                                                className="comment-menu w-full text-center px-3 text-nowrap"
                                                                onClick={() =>
                                                                    deleteComment(
                                                                        comment.id
                                                                    )
                                                                }
                                                            >
                                                                삭제하기
                                                            </button>
                                                        </ul>
                                                        <div
                                                            className="flex gap-1 cursor-pointer py-1"
                                                            onClick={() => {
                                                                setComments(
                                                                    comments.map(
                                                                        (c) => {
                                                                            if (
                                                                                c.id ===
                                                                                comment.id
                                                                            ) {
                                                                                return {
                                                                                    ...c,
                                                                                    isMenuOpen:
                                                                                        !c.isMenuOpen,
                                                                                };
                                                                            } else {
                                                                                return {
                                                                                    ...c,
                                                                                    isMenuOpen:
                                                                                        false,
                                                                                };
                                                                            }
                                                                        }
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            <div className="w-[4px] h-[4px] rounded-full bg-app-font-3" />
                                                            <div className="w-[4px] h-[4px] rounded-full bg-app-font-3" />
                                                            <div className="w-[4px] h-[4px] rounded-full bg-app-font-3" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Comment Content and Like button */}
                                            <div className="w-full flex">
                                                <p className="w-full text-app-font-2 text-sm">
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
                    <CommentSectionTextArea
                        text={text}
                        setText={setText}
                        onSubmit={onSubmitComment}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default CommentsSection;
