import React from "react";
import Post from "@/app/community/following/_components/Post";
import exampleImage from "@/app/_images/pooh.jpg";

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
        <>
            <div className="border-b-2">
                <p className="mx-3">Suggested Posts</p>
            </div>

            <div className="flex flex-col gap-5">
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
        </>
    );
};

export default Follwing;
