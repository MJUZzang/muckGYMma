import React from "react";
import Post from "@/community/following/_components/Post";
import exampleImage from "@/_images/pooh.jpg";

const Follwing = () => {
    const dummyPost = {
        comments: 0,
        content: "Hello World",
        hasLiked: false,
        id: 1,
        image: exampleImage,
        likes: 0,
        postedAt: new Date(),
        user: {
            name: "John Doe",
            avatar: exampleImage,
        },
    };

    return (
        <div className="">
            <div className="">
                <p className="mx-3 text-white/50">Suggested Posts</p>
            </div>

            <div className="flex flex-col gap-5 pt-3">
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
                <Post postInfo={dummyPost} />
            </div>
        </div>
    );
};

export default Follwing;
