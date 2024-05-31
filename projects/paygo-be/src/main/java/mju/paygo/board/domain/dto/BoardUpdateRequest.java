package mju.paygo.board.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BoardUpdateRequest(
        @NotBlank(message = "내용을 비워둘 수 없습니다.")
        String content,

        @NotNull(message = "게시글 ID를 제공해야 합니다.")
        Long boardId
) {}
