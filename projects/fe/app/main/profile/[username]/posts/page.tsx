import React from "react";
import exampleImage from "@/_images/pooh.jpg";
import Post from "@/main/community/following/_components/Post";
import NoData from "@/main/profile/_components/NoData";
import { cookies } from "next/headers";
import { PostInfo } from "@/_types/PostInfo";
import { backendUrl } from "@/_utils/urls";
import { convertPostsCreatedAtToDate } from "@/_utils/post";

async function fetchUserPosts(nickname: string) {
    const cookieStore = cookies();

    return await fetch(
        `${backendUrl}/api/board/my-posts?nickname=${nickname}`,
        {
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
        }
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Sever responsded with an error");
            }
        })
        .then((data: PostInfo[]) => {
            if (data) {
                console.log("posts: ", data);
                return convertPostsCreatedAtToDate(data);
            } else {
                throw new Error("Failed to fetch user posts");
            }
        })
        .catch((err) => {
            console.error(err);
            const dummyPosts: PostInfo[] = [
                {
                    id: 3,
                    content: "ㅁㄴㅇ",
                    imageUrls: [
                        "https://muckgymma.s3.ap-northeast-2.amazonaws.com/food/62af530b-7986-48b1-b869-ce7d1b0a4e03_2_image.jpg",
                    ],
                    memberId: 2,
                    nickname: "test",
                    likeCount: 0,
                    isLikedByMember: false,
                    commentCount: 0,
                    kcal: 0,
                    createdAt: new Date(),
                    profileImageUrl:
                        "https://muckgymma.s3.ap-northeast-2.amazonaws.com/food/62af530b-7986-48b1-b869-ce7d1b0a4e03_2_image.jpg",
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
            {posts.length > 0 ? (
                <div className="flex flex-col items-center gap-3">
                    {posts.map((post, i) => (
                        <Post key={i} postInfo={post} />
                    ))}
                </div>
            ) : (
                <NoData text="업로드된 포스트가 없습니다." />
            )}
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
