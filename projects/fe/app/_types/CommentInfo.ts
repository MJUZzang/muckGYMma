export interface CommentInfo {
    id: number;
    memberId: number;
    memberNickname: string;
    memberEmail: string;
    boardId: number;
    profileImageUrl: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
