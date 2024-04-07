import type UserInfo from "@/app/_types/UserInfo";

export default interface CommentInfo {
    id: number;
    content: string;
    user: UserInfo;
    postedAt: Date;
}