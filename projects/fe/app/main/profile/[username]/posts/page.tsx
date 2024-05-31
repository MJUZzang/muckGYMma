import React from "react";
import exampleImage from "@/_images/pooh.jpg";
import Post from "@/main/community/following/_components/Post";
import NoData from "@/main/profile/_components/NoData";
import { cookies } from "next/headers";
import PostInfo from "@/_types/PostInfo";
import { backendUrl } from "@/_utils/urls";

async function fetchUserPosts(nickname: string) {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/board/my-posts`, {
        method: "GET",
        credentials: "include",
        headers: {
            Cookie: cookieStore
                .getAll()
                .map((cookie) => {
                    return `${cookie.name}=${cookie.value}`;
                })
                .join("; "),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname }),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Sever responsded with an error");
            }
        })
        .then((data: PostInfo[]) => {
            if (data) {
                console.log(data);
                return data;
            } else {
                throw new Error("Failed to fetch user posts");
            }
        })
        .catch((err) => {
            console.error(err);
            const dummyPosts: PostInfo[] = [
                {
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
                },
            ];
            return dummyPosts;
        });
}

interface PostsPageProps {
    params: { username: string };
}

async function PostsPage({ params }: Readonly<PostsPageProps>) {
    const nickname = params.username;

    const posts = await fetchUserPosts(nickname);

    return (
        <>
            <NoData text="업로드된 포스트가 없습니다." />

            <div className="flex flex-col items-center gap-3">
                {posts.map((post, i) => (
                    <Post key={i} postInfo={post} />
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
