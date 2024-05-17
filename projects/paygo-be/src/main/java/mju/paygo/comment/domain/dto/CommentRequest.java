package mju.paygo.comment.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentRequest(
        @NotNull(message = "게시글 ID를 제공해야 합니다.")
        Long boardId,

        @NotNull(message = "댓글 ID를 제공해야 합니다.")
        Long commentId,

        @NotBlank(message = "댓글 내용을 비워둘 수 없습니다.")
        String content
) {}
