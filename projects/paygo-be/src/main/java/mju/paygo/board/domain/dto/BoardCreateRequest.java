package mju.paygo.board.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record BoardCreateRequest(
        @NotBlank(message = "내용을 비워둘 수 없습니다.")
        String content
) {}
