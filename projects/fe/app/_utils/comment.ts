import { CommentInfo } from "@/_types/CommentInfo";

export function convertCommentsDatesToDate(comment: CommentInfo[]): CommentInfo[] {
    return comment.map((comment) => {
        return {
            ...comment,
            createdAt: new Date(comment.createdAt),
            updatedAt: new Date(comment.updatedAt),
        }
    });
}

export function sortCommnetsByDate(comments: CommentInfo[]): CommentInfo[] {
    return comments.sort((a, b) => {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    });
}