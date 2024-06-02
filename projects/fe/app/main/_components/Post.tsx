"use client";

import { PostInfo } from "@/_types/PostInfo";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Like from "@/main/community/_images/Like";
import Comment from "@/main/community/_images/Comment";
import SpoonKnife from "@/main/community/_images/SpoonKnife";
import CommentsSection from "@/main/community/_components/CommentsSection";

import { Jua, Noto_Sans, Noto_Sans_KR } from "next/font/google";
import { backendUrl } from "@/_utils/urls";
import { useAppSelector } from "../../../lib/hooks";
import { selectNickname } from "../../../lib/slices/userInfoSlice";
import Link from "next/link";

const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});
const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: "400",
});
const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});
// const dosis = Dosis({ subsets: ["latin"] });

interface PostProps {
    postInfo: PostInfo;
}

const Post: React.FC<PostProps> = ({ postInfo }) => {
    const [truncatedContent, setTruncatedContent] = useState<string>(
        postInfo.content.slice(0, 80) +
            `${postInfo.content.length > 80 ? "..." : ""}`
    );

    const [showFullContent, setShowFullContent] = useState<boolean>(
        postInfo.content.length <= 80
    );
    const [post, setPost] = useState<PostInfo>(postInfo);

    const myNickname = useAppSelector(selectNickname);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    function deletePost() {
        fetch(`${backendUrl}/api/board/delete`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                boardId: post.id,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    window.location.reload();
                } else {
                    throw new Error("Failed to delete post");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleLiked() {
        fetch(`${backendUrl}/api/likes`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                boardId: post.id,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to like post");
                }
            })
            .then((data: { isLiked: boolean }) => {
                setPost((prev) => {
                    return {
                        ...prev,
                        isLikedByMember: data.isLiked,
                        likeCount: prev.likeCount + (data.isLiked ? 1 : -1),
                    };
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="max-w-[470px] w-full backdrop-blur-lg rounded-lg bg-app-bg pb-2">
            <div className="mx-2 flex flex-col py-3">
                {/* 유저 정보 */}
                <div className="flex">
                    <Link
                        href={`/main/profile/${post.nickname}/posts`}
                        className="w-[40px] h-[40px]"
                    >
                        <div className="w-[40px] h-[40px] overflow-clip rounded-full">
                            <Image
                                src={post.profileImageUrl}
                                width={325}
                                height={325}
                                alt={post.nickname}
                                className="w-[40px] h-[40px] pointer-events-none"
                            />
                        </div>
                    </Link>

                    <div className="flex flex-col">
                        <Link
                            href={`/main/profile/${post.nickname}/posts`}
                            className={`ml-2 text-app-font-2 ${notoSans.className}`}
                        >
                            {post.nickname}
                        </Link>
                        <p className="ml-2 text-xs text-app-font-4">
                            {post.createdAt.toLocaleString()}
                        </p>
                    </div>

                    {myNickname === post.nickname && (
                        <div
                            className={`ml-auto flex relative right-1 ${notoSansKr.className}`}
                        >
                            <ul
                                className={`comment-menu flex text-sm flex-col py-2 absolute right-7 rounded-xl bg-app-bg shadow-xl border-2 border-gray-200 text-app-font-1 gap-1 px-2 ${
                                    !isMenuOpen && "hidden"
                                }`}
                            >
                                <button
                                    className="comment-menu w-full text-center px-3 text-nowrap"
                                    onClick={() => {
                                        alert("업데이트 예정된 기능입니다.");
                                    }}
                                >
                                    ✍️ 수정하기
                                </button>
                                <div className="comment-menu bg-app-bg-3 h-[2px]" />
                                <button
                                    className="comment-menu w-full text-center px-3 text-nowrap"
                                    onClick={deletePost}
                                >
                                    ❌ 삭제하기
                                </button>
                            </ul>
                            <div
                                className="flex gap-1 cursor-pointer py-1"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <div className="w-[4px] h-[4px] rounded-full bg-app-font-3" />
                                <div className="w-[4px] h-[4px] rounded-full bg-app-font-3" />
                                <div className="w-[4px] h-[4px] rounded-full bg-app-font-3" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 포스트 이미지 */}
            <div className={`overflow-clip aspect-square`}>
                <Image
                    src={post.imageUrls[0]}
                    alt="Post image"
                    width={325}
                    height={325}
                    className="rounded-t-lg w-full"
                />
            </div>

            {/* 포스트 정보 */}
            <div className="flex justify-between mt-1 px-2">
                <div className="w-full flex py-1 gap-3">
                    <div
                        className={`flex items-center gap-2 text-sm text-app-font-2 cursor-pointer ${notoSans.className}`}
                    >
                        <Like
                            onClick={handleLiked}
                            isLiked={post.isLikedByMember}
                            className={`${
                                post.isLikedByMember
                                    ? "stroke-[#FF0000]"
                                    : "stroke-app-font-3"
                            } ${
                                post.isLikedByMember
                                    ? "fill-[#FF0000]"
                                    : "fill-none"
                            }`}
                        />
                        <p>{post.likeCount}</p>
                    </div>

                    <div
                        className={`flex items-center gap-2 text-sm text-app-font-2 cursor-pointer ${notoSans.className}`}
                    >
                        <CommentsSection onClose={() => {}} post={post}>
                            <Comment className="fill-app-font-3" />
                        </CommentsSection>
                        <p>{post.commentCount}</p>
                    </div>

                    <div
                        className={`ml-auto flex items-center gap-2 text-sm text-app-font-2 ${
                            notoSans.className
                        } ${!post.kcal && "invisible"}`}
                    >
                        <SpoonKnife className="fill-app-font-3" />
                        <p>{post.kcal} kcal</p>
                    </div>
                </div>
            </div>

            {/* 포스트 내용 */}
            <p className={`mx-2 text-pretty text-sm text-app-font-1 mt-1`}>
                {truncatedContent}
            </p>
            {!showFullContent && (
                <button
                    className={`text-app-font-4 text-xs mt-1 mx-2`}
                    onClick={() => {
                        setTruncatedContent(post.content);
                        setShowFullContent(true);
                    }}
                >
                    더 보기...
                </button>
            )}
        </div>
    );
};

export default Post;
