package mju.paygo.comment.domain.dto;

import jakarta.validation.constraints.NotNull;

public record CommentDeleteRequest(
        @NotNull(message = "댓글 ID를 제공해야 합니다.")
        Long commentId
) {}
