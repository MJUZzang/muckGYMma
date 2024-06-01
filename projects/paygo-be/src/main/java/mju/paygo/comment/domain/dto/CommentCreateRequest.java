package mju.paygo.comment.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentCreateRequest(
        @NotNull(message = "게시글 ID를 제공해야 합니다.")
        Long boardId,

        @NotBlank(message = "댓글 내용을 비워둘 수 없습니다.")
        String content
) {
}
