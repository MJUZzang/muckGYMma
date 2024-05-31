import { PostInfo } from "@/_types/PostInfo";

export function convertPostsPostedAtToDate(posts: PostInfo[]): PostInfo[] {
    
    return posts.map((post) => {
        return {
            ...post,
            postedAt: new Date(post.postedAt),
        };
    });
}
