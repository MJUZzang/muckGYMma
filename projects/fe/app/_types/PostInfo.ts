export interface LikeInfo {
    profileImageUrl: string;
    nickname: string;
    email: string;
    isFollowing: boolean;
}

export interface PostInfo {
    id: number;
    content: string;
    imageUrls: string[];
    memberId: number;
    nickname: string;
    likeCount: number;
    isLikedByMember: boolean;
    commentCount: number;
    kcal: number;
    profileImageUrl: string;
    createdAt: Date;
    likes?: LikeInfo[];
}
