"use client";

import React from "react";
import NavigateBack from "../profile/[username]/(follow)/_components/NavigateBack";
import { Noto_Sans_KR } from "next/font/google";
import { LikeInfo, PostInfo } from "@/_types/PostInfo";
import Image from "next/image";
import { backendUrl } from "@/_utils/urls";
import { useAppSelector } from "../../../lib/hooks";
import { selectNickname } from "../../../lib/slices/userInfoSlice";
import Like from "../community/_images/Like";
import CatPlaceholder from "../community/_components/CatPlaceholder";
import ArrowBack from "@/_images/ArrowBack";
import Link from "next/link";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });
interface LikesProps {
    likeList?: LikeInfo[];
    setPost: React.Dispatch<React.SetStateAction<PostInfo>>;
    isOpen?: boolean;
    onClose?: () => void;
}

function Likes({ likeList, setPost, isOpen, onClose = () => {} }: LikesProps) {
    const myNickname = useAppSelector(selectNickname);

    function handleButtonClick(like: LikeInfo) {
        fetch(`${backendUrl}/api/follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                followerNickname: myNickname,
                followeeNickname: like.nickname,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to unfollow the user");
                }
            })
            .then((data: { isFollowing: boolean }) => {
                if (!data) {
                    throw new Error("Failed to unfollow the user");
                }
                if (data.isFollowing) {
                    setPost((prev) => {
                        return {
                            ...prev,
                            likes: prev.likes?.map((prevLike) => {
                                if (prevLike.nickname === like.nickname) {
                                    return {
                                        ...prevLike,
                                        justUnfollowed: false,
                                    };
                                }
                                return prevLike;
                            }),
                        };
                    });
                } else {
                    setPost((prev) => {
                        return {
                            ...prev,
                            likes: prev.likes?.map((prevLike) => {
                                if (prevLike.nickname === like.nickname) {
                                    return {
                                        ...prevLike,
                                        justUnfollowed: true,
                                    };
                                }
                                return prevLike;
                            }),
                        };
                    });
                }
            });
    }

    return (
        <div
            className={`fixed top-0 w-full h-[100dvh] z-[10] bg-app-bg transition-opacity duration-700 ${
                notoSansKr.className
            } ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div className="grid grid-cols-3 px-2 py-2">
                <ArrowBack
                    className="fill-app-font-2 z-[30]"
                    onClick={() => {
                        onClose();
                    }}
                />
                <p className="w-full text-center text-lg">좋아요</p>
                <div />
            </div>

            <div className="my-2">
                <div className="flex justify-center">
                    <Like
                        isLiked={true}
                        onClick={() => {}}
                        className={`stroke-[#FF0000]" fill-[#FF0000]`}
                    />
                    <p>{likeList?.length || 0}</p>
                </div>
                <p className="text-center text-app-font-3">
                    이 게시물의 총 좋아요 수
                </p>
            </div>

            {!likeList && (
                <div className="flex justify-center items-center fixed top-0 left-0 w-full h-[100dvh]">
                    <CatPlaceholder
                        text1="게시글에 좋아요가 없습니다"
                        text2="첫 좋아요를 남겨주세요.."
                    />
                </div>
            )}

            <div className="pb-[90px]">
                <div className={`space-y-2 px-3 pt-2 ${notoSansKr.className}`}>
                    {likeList?.map((like, index) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                {/* Avatar Image */}
                                <Link href={`/main/profile/${like.nickname}/posts`} className="w-[45px] h-[45px]">
                                    <div className="w-[45px] h-[45px] overflow-clip rounded-full">
                                        <Image
                                            src={like.profileImageUrl}
                                            alt="User avatar"
                                            className="w-[45px] h-[45px] pointer-events-none"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </Link>

                                <div className="w-full">
                                    <p className="text-app-font-2">
                                        {like.nickname}
                                    </p>
                                    <p className="text-xs text-app-font-4">
                                        {like.email}
                                    </p>
                                </div>

                                <button
                                    className="text-nowrap text-sm rounded-lg px-3 py-1 border-2 z-[30]"
                                    onClick={() => {
                                        handleButtonClick(like);
                                    }}
                                >
                                    {like.justUnfollowed ? "팔로우" : "팔로잉"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Likes;
