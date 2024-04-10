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
        <>
            <div className="flex flex-col items-center pt-3 pb-6">
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
