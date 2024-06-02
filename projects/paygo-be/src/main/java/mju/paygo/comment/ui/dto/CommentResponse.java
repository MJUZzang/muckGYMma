package mju.paygo.comment.ui.dto;

import java.time.ZonedDateTime;

public record CommentResponse(
        Long id,
        Long memberId,
        String memberNickname,
        String memberEmail,
        Long boardId,
        String profileImageUrl,
        String content,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt
) {
}
