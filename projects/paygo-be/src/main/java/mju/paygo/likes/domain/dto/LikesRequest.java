package mju.paygo.likes.domain.dto;

import jakarta.validation.constraints.NotNull;

public record LikesRequest(
        @NotNull(message = "게시글 ID를 제공해야 합니다.")
        Long boardId
) {}
