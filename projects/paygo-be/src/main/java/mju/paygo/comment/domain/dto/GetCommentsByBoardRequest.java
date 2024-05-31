package mju.paygo.comment.domain.dto;

import jakarta.validation.constraints.NotNull;

public record GetCommentsByBoardRequest(
        @NotNull(message = "게시글 ID를 제공해야 합니다.")
        Long boardId
){}
