package mju.paygo.board.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record BoardFindRequest(
        @NotBlank(message = "닉네임을 비워둘 수 없습니다.")
        String nickname
) {}
