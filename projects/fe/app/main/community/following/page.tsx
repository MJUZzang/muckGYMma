import React from "react";
import Post from "@/main/community/following/_components/Post";
import exampleImage from "@/_images/pooh.jpg";
import { PostInfo } from "@/_types/PostInfo";

async function FollwingPage() {
    const dummyPost: PostInfo = {
        id: 3,
        content: "ㅁㄴㅇ",
        imageUrls: [
            "https://muckgymma.s3.ap-northeast-2.amazonaws.com/food/62af530b-7986-48b1-b869-ce7d1b0a4e03_2_image.jpg",
        ],
        memberId: 2,
        nickname: "test",
        likeCount: 0,
        isLikedByMember: false,
        commentCount: 0,
        kcal: 0,
        createdAt: new Date(),
        profileImageUrl:
            "https://muckgymma.s3.ap-northeast-2.amazonaws.com/food/62af530b-7986-48b1-b869-ce7d1b0a4e03_2_image.jpg",
    };

    return (
        <>
            <div className="flex flex-col items-center pt-3 pb-6 h-full gap-3 bg-app-bg-1">
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
            </div>
        </>
    );
}

export default FollwingPage;
