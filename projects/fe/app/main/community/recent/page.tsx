import React from "react";
import Post from "@/main/community/following/_components/Post";

import { fetchRecentPosts } from "@/_utils/post";

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
