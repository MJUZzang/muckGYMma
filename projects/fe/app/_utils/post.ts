import { PostInfo } from "@/_types/PostInfo";
import { backendUrl } from "@/_utils/urls";
import { cookies } from "next/headers";

export const dummyPosts: PostInfo[] = [
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

export async function fetchUserPosts(nickname: string) {
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
                const converted = convertPostsCreatedAtToDate(data);
                const likeCountCalculated = converted.map((post) => {
                    return {
                        ...post,
                        likeCount: post.likes ? post.likes.length : 0,
                    };
                });
                console.log(likeCountCalculated);
                return likeCountCalculated;
            } else {
                throw new Error("Failed to fetch user posts");
            }
        })
        .catch((err) => {
            console.error(err);
            return dummyPosts;
        });
}

export async function fetchFollowingPosts() {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/board/following-posts`, {
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
                console.warn(res.status, res.statusText);
                throw new Error("Server responded with an error");
            }
        })
        .then((data: PostInfo[]) => {
            if (data) {
                const converted = convertPostsCreatedAtToDate(data);
                const likeCountCalculated = converted.map((post) => {
                    return {
                        ...post,
                        likeCount: post.likes ? post.likes.length : 0,
                    };
                });
                console.log(likeCountCalculated);
                return likeCountCalculated;
            } else {
                throw new Error("Failed to fetch recent posts");
            }
        })
        .catch((err) => {
            console.error(err);
            return dummyPosts;
        });
}

export async function fetchRecentPosts() {
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
                console.warn(res.status, res.statusText);
                throw new Error("Server responded with an error");
            }
        })
        .then((data: PostInfo[]) => {
            if (data) {
                const converted = convertPostsCreatedAtToDate(data);
                const likeCountCalculated = converted.map((post) => {
                    return {
                        ...post,
                        likeCount: post.likes ? post.likes.length : 0,
                    };
                });
                console.log(likeCountCalculated);
                return likeCountCalculated;
            } else {
                throw new Error("Failed to fetch recent posts");
            }
        })
        .catch((err) => {
            console.error(err);
            return dummyPosts;
        });
}

export function convertPostsCreatedAtToDate(posts: PostInfo[]): PostInfo[] {
    return posts.map((post) => {
        let date = new Date();
        if (post.createdAt) {
            date = new Date(post.createdAt);
        }
        return {
            ...post,
            createdAt: date,
        };
    });
}

export function sortPostsByDate(posts: PostInfo[]): PostInfo[] {
    return posts.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
    });
}
