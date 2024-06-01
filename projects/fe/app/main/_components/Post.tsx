"use client";

import { PostInfo } from "@/_types/PostInfo";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Like from "@/main/community/_images/Like";
import Comment from "@/main/community/_images/Comment";
import SpoonKnife from "@/main/community/_images/SpoonKnife";
import CommentsSection from "@/main/community/_components/CommentsSection";

import { Jua, Noto_Sans } from "next/font/google";
import { backendUrl } from "@/_utils/urls";

const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});
const notoSans = Noto_Sans({
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
                    <Image
                        src={post.profileImageUrl}
                        width={325}
                        height={325}
                        alt={post.nickname}
                        className="w-10 h-10 rounded-full pointer-events-none"
                    />
                    <div className="flex flex-col">
                        <p
                            className={`ml-2 text-app-font-2 ${notoSans.className}`}
                        >
                            {post.nickname}
                        </p>
                        <p className="ml-2 text-xs text-app-font-4">
                            {post.createdAt.toLocaleString()}
                        </p>
                    </div>
                    <div></div>
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
