"use client";

import React, { use, useEffect, useState } from "react";
import Post from "@/main/_components/Post";

import { PostInfo } from "@/_types/PostInfo";
import { backendUrl } from "@/_utils/urls";
import { convertPostsCreatedAtToDate, dummyPosts } from "@/_utils/post";

function RecentPage() {
    const [promise, setPromise] = useState<Promise<void> | null>(null);
    const [posts, setPosts] = useState<PostInfo[]>([]);

    useEffect(() => {
        setPromise(fetchRecentPosts());
    }, []);

    if (promise) {
        use(promise);
    }

    async function fetchRecentPosts() {
        fetch(`${backendUrl}/api/board/other-posts`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.warn(res.status, res.statusText);
                    throw new Error("Server responded with an error");
                }
            })
            .then((data: PostInfo[]) => {
                if (data) {
                    const posts = convertPostsCreatedAtToDate(data);
                    setPosts(posts);
                } else {
                    throw new Error("Failed to fetch recent posts");
                }
            })
            .catch((err) => {
                console.error(err);
                setPosts(dummyPosts);
            });
    }

    if (!promise) {
        return null;
    }

    return (
        <>
            <div className="flex flex-col items-center pt-3 pb-6 h-full gap-3 bg-app-bg-1">
                {posts.map((post) => (
                    <Post postInfo={post} key={post.id} />
                ))}
            </div>
        </>
    );
}

export default RecentPage;
