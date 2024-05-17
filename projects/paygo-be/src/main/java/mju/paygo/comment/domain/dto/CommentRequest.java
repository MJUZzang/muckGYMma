package mju.paygo.comment.domain.dto;

public record CommentRequest(
        Long memberId,
        Long boardId,
        Long commentId,
        String content
) {
}