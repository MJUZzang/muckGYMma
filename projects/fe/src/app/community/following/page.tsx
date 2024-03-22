import React from "react";
import Post from "@/app/community/following/_components/Post";
import exampleImage from "@/app/_images/pooh.jpg";

const Follwing = () => {
    return (
        <>
            <div className="border-b-2">
                <p className="mx-3">Suggested Posts</p>
            </div>

            <Post
                postInfo={{
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
                }}
            />
        </>
    );
};

export default Follwing;
