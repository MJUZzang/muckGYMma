import React from "react";
import Post from "@/main/community/following/_components/Post";
import exampleImage from "@/_images/pooh.jpg";
import { backendUrl } from "@/_utils/urls";
import { cookies } from "next/headers";
import PostInfo from "@/_types/PostInfo";

async function fetchRecentPosts() {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/board/other-posts`, {
        method: "GET",
        credentials: "include",
        headers: {
            Cookie: cookieStore
                .getAll()
                .map((cookie) => {
                    return `${cookie.name}=${cookie.value}`;
                })
                .join("; "),
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Server responded with an error");
            }
        })
        .then((data: PostInfo[]) => {
            if (data) {
                console.log(data);
                return data;
            } else {
                throw new Error("Failed to fetch recent posts");
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

async function RecentPage() {
    const posts = await fetchRecentPosts();

    return (
        <>
            <div className="flex flex-col items-center pt-3 pb-6 h-full gap-3 bg-app-bg-1">
                {posts.map((post, i) => (
                    <Post postInfo={post} key={i} />
                ))}
            </div>
        </>
    );
}

export default RecentPage;
