import PostInfo from "@/app/_types/PostInfo";
import Image from "next/image";
import React from "react";
import Like from "./_images/Like";
import Comment from "./_images/Comment";
import SpoonKnife from "./_images/SpoonKnife";

interface PostProps {
    postInfo: PostInfo;
}

const Post: React.FC<PostProps> = ({ postInfo }) => {
    return (
        <div className="bg-[#f1f1f1]">
            <div className="mx-3 flex flex-col py-3">
                {/* 유저 정보 */}
                <div className="flex">
                    <Image
                        src={postInfo.user.avatar}
                        alt={postInfo.user.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                        <p className="ml-2">{postInfo.user.name}</p>
                        <p className="ml-2 text-xs text-gray-500">
                            {postInfo.postedAt.toDateString()}
                        </p>
                    </div>
                </div>

                {/* 포스트 내용 */}
                <p className="mt-2">{postInfo.content}</p>
            </div>

            {/* 포스트 이미지 */}
            <Image
                src={postInfo.image}
                alt="Post image"
                className="w-full rounded-t-lg"
            />

            {/* 포스트 정보 */}
            <div className="flex justify-between text-sm text-gray-500 mx-3 py-2">
                <p>{postInfo.likes} liked</p>
                <p>{postInfo.comments} comments</p>
            </div>

            <div className="flex justify-between border-t-2 mx-2 py-2">
                <Like className="basis-1/3" />
                <Comment className="basis-1/3" />
                <SpoonKnife className="basis-1/3" />
            </div>
        </div>
    );
};

export default Post;
