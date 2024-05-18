package mju.paygo.comment.ui.dto;

import java.time.LocalDateTime;

public record CommentResponse(
        Long id,
        Long memberId,
        String memberNickname,
        String memberEmail,
        Long boardId,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}