"use client";

import PostInfo from "@/_types/PostInfo";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Like from "@/community/following/_images/Like";
import Comment from "@/community/following/_images/Comment";
import SpoonKnife from "@/community/following/_images/SpoonKnife";
import CommentsSection from "@/community/following/_components/CommentsSection";

import { Jua, Noto_Sans_KR, Noto_Sans } from "next/font/google";

const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});
const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });
const notoSans = Noto_Sans({ subsets: ["latin"] });
// const dosis = Dosis({ subsets: ["latin"] });

interface PostProps {
    postInfo: PostInfo;
}

const Post: React.FC<PostProps> = ({ postInfo }) => {
    const [truncatedContent, setTruncatedContent] = useState<string>(
        postInfo.content.slice(0, 80) + "..."
    );
    const [showFullContent, setShowFullContent] = useState<boolean>(
        postInfo.content.length <= 80
    );
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const postRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number>(
        document.documentElement.clientWidth > 470
            ? 470
            : document.documentElement.clientWidth
    );

    useEffect(() => {
        function handleWidthChange() {
            setHeight(postRef.current?.clientWidth || 0);
        }

        window.addEventListener("resize", handleWidthChange);
        return () => {
            window.removeEventListener("resize", handleWidthChange);
        };
    }, []);

    return (
        <div
            ref={postRef}
            className="max-w-[470px] w-full backdrop-blur-lg rounded-lg bg-app-bg pb-2"
        >
            <div className="mx-2 flex flex-col py-3">
                {/* 유저 정보 */}
                <div className="flex">
                    <Image
                        src={postInfo.user.avatar}
                        alt={postInfo.user.name}
                        className="w-10 h-10 rounded-full pointer-events-none"
                    />
                    <div className="flex flex-col">
                        <p
                            className={`ml-2 text-app-font-2 ${notoSans.className}`}
                        >
                            {postInfo.user.name}
                        </p>
                        <p className="ml-2 text-xs text-app-font-4">
                            {postInfo.postedAt.toDateString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* 포스트 이미지 */}
            <div
                className={`overflow-clip`}
                style={{
                    width: height,
                    height: height,
                }}
            >
                <Image
                    src={postInfo.image}
                    alt="Post image"
                    width={height}
                    className="rounded-t-lg"
                />
            </div>

            {/* 포스트 정보 */}
            <div className="flex justify-between mt-1 px-2">
                <div className="w-full flex py-1 gap-3">
                    <div
                        className={`flex items-center gap-2 text-sm text-app-font-2 ${notoSans.className}`}
                    >
                        <Like
                            onClick={() => setIsLiked(!isLiked)}
                            isLiked={isLiked}
                            className={`${
                                isLiked
                                    ? "stroke-[#FF0000]"
                                    : "stroke-app-font-3"
                            } ${isLiked ? "fill-[#FF0000]" : "fill-none"}`}
                        />
                        <p>{postInfo.likes}</p>
                    </div>

                    <div
                        className={`flex items-center gap-2 text-sm text-app-font-2 ${notoSans.className}`}
                    >
                        <CommentsSection>
                            <Comment className="fill-app-font-3" />
                        </CommentsSection>
                        <p>{postInfo.comments}</p>
                    </div>

                    <div
                        className={`ml-auto flex items-center gap-2 text-sm text-app-font-2 ${notoSans.className}`}
                    >
                        <SpoonKnife className="fill-app-font-3" />
                        <p>322 kcal</p>
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
                        setTruncatedContent(postInfo.content);
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
