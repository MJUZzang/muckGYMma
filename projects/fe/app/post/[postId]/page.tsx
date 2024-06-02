import { backendUrl } from "@/_utils/urls";
import { FetchNickname } from "@/_utils/user";
import { cookies } from "next/headers";
import React, { useEffect } from "react";

async function fetchPostById(id: number) {
    const cookieStore = cookies();
    return await fetch(`${backendUrl}/api/board/board?boardId=${id}`, {
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
        .then((post) => {
            if (post) {
                return post;
            } else {
                throw new Error("Failed to fetch post");
            }
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
}

interface PostPageProps {
    params: {
        postId: number;
    };
}

async function PostPage({ params }: PostPageProps) {
    const postId = params.postId;
    console.log("postId: ", postId);
    const post = await fetchPostById(postId);
    console.log("post: ", post);
    return <div>Page</div>;
}

export default PostPage;