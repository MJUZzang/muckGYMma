import PostInfo from "@/_types/PostInfo";
import Image from "next/image";
import React from "react";
import Like from "@/community/following/_images/Like";
import Comment from "@/community/following/_images/Comment";
import SpoonKnife from "@/community/following/_images/SpoonKnife";
import CommentsSection from "@/community/following/_components/CommentsSection";

interface PostProps {
    postInfo: PostInfo;
}

const Post: React.FC<PostProps> = ({ postInfo }) => {
    return (
        <div className="max-w-[470px] w-full backdrop-blur-lg rounded-lg">
            <div className="mx-1 flex flex-col py-3">
                {/* 유저 정보 */}
                <div className="flex">
                    <Image
                        src={postInfo.user.avatar}
                        alt={postInfo.user.name}
                        className="w-10 h-10 rounded-full"
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
            <Image
                src={postInfo.image}
                alt="Post image"
                className="w-full rounded-t-lg"
            />

            {/* 포스트 내용 */}
            <p className="mt-2 text-gray-100">{postInfo.content}</p>

            <div className="flex justify-between border-b-2 border-b-white/60 mt-1 pl-1 pr-3">
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
        </div>
    );
};

export default Post;
