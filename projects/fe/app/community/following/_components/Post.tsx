"use client";

import PostInfo from "@/_types/PostInfo";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Like from "@/community/following/_images/Like";
import Comment from "@/community/following/_images/Comment";
import SpoonKnife from "@/community/following/_images/SpoonKnife";
import CommentsSection from "@/community/following/_components/CommentsSection";

import { Jua, Noto_Sans_KR } from "next/font/google";

const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});
const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });
// const dosis = Dosis({ subsets: ["latin"] });

interface PostProps {
    postInfo: PostInfo;
}

const Post: React.FC<PostProps> = ({ postInfo }) => {
    const [truncatedContent, setTruncatedContent] = useState<string>(postInfo.content.slice(0, 80) + "...");
    const [showFullContent, setShowFullContent] = useState<boolean>(postInfo.content.length <= 80);

    const postRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number>(
        document.documentElement.clientWidth > 470 ? 470 : document.documentElement.clientWidth
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
            className="max-w-[470px] w-full backdrop-blur-lg rounded-lg"
        >
            <div className="mx-1 flex flex-col py-3">
                {/* 유저 정보 */}
                <div className="flex">
                    <Image
                        src={postInfo.user.avatar}
                        alt={postInfo.user.name}
                        className="w-10 h-10 rounded-full pointer-events-none"
                    />
                    <div className="flex flex-col">
                        <p className="ml-2 text-gray-100">
                            {postInfo.user.name}
                        </p>
                        <p className="ml-2 text-xs text-gray-300">
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

            {/* 포스트 액션 */}
            <div className="flex justify-between mt-1 pl-1 pr-3">
                <div className="flex py-1 gap-3">
                    <Like className="fill-white" />
                    <CommentsSection>
                        <Comment className="fill-white" />
                    </CommentsSection>
                    <SpoonKnife className="fill-white" />
                </div>

                {/* 포스트 정보 */}
                <div className="flex justify-end gap-4 text-sm text-gray-300 py-2">
                    <p>{postInfo.likes} liked</p>
                    <p>{postInfo.comments} comments</p>
                </div>
            </div>

            {/* 포스트 내용 */}
            <p className="mx-1 text-gray-100 text-pretty">{truncatedContent}</p>
            {!showFullContent && (
                <button
                    className={`text-gray-300 text-xs mt-1 mx-1`}
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
