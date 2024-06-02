interface FollowInfo {
    nickname: string;
    email: string;
    profileImageUrl: string;
}

export interface FollowerInfo extends FollowInfo {}
export interface FollowingInfo extends FollowInfo {}
