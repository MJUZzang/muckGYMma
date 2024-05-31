package mju.paygo.member.application.member.dto;

import jakarta.validation.constraints.NotEmpty;

public record NicknameRequest(
        @NotEmpty(message = "닉네임이 필요합니다.")
        String nickname
) {
}
