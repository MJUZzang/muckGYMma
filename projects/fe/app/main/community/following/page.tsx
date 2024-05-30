import React from "react";
import Post from "@/main/community/following/_components/Post";
import exampleImage1 from "@/_images/pooh.jpg";
import exampleImage2 from "@/_images/wapper.jpg";

const Follwing = () => {
    const dummyPost = {
        comments: 3,
        content:
            "[토막상식] 사실 햄버거는 살 안찌는 완전 식품이랍니다! 감튀랑 콜라 안 먹었으니까 와퍼는 2개~",
        hasLiked: false,
        id: 1,
        image: exampleImage2,
        likes: 6,
        postedAt: new Date(),
        user: {
            name: "jeheecheon",
            avatar: exampleImage1,
        },
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
};

export default Follwing;
