import React from "react";
import exampleImage from "@/_images/pooh.jpg";
import Post from "@/main/community/following/_components/Post";
import NoData from "@/main/profile/_components/NoData";

interface PostsPageProps {
    params: { username: string };
}

async function PostsPage({ params }: Readonly<PostsPageProps>) {
    const nickname = params.username;
        
    const dummyPost = {
        comments: 0,
        content:
            "Hello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello world",
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
            <NoData text="업로드된 포스트가 없습니다." />

            <div className="flex flex-col items-center gap-3">
                {Array.from({ length: 0 }).map((_, i) => (
                    <Post key={i} postInfo={dummyPost} />
                ))}
            </div>
        </>
    );
}

export default PostsPage;

// <div className="grid grid-cols-3 gap-1 md:gap-3">
//     {Array.from({ length: 16 }).map((_, i) => (
//         <div key={i} className="aspect-square overflow-clip">
//             <Image src={exampleImage} alt="avatar" />
//         </div>
//     ))}
// </div>
