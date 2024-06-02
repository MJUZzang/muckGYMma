import React from "react";
import Post from "@/main/_components/Post";

import { fetchRecentPosts, sortPostsByDate } from "@/_utils/post";

async function RecentPage() {
    const posts = await fetchRecentPosts();
    const sortedPosts = sortPostsByDate(posts)

    return (
        <>
            <div className="flex flex-col items-center pt-3 pb-6 h-full gap-3 bg-app-bg-1">
                {sortedPosts.map((post, i) => (
                    <Post postInfo={post} key={post.id} />
                ))}
            </div>
        </>
    );
}

export default RecentPage;
