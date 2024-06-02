package mju.paygo.follow.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record FollowRequest(
        @NotBlank(message = "팔로우 요청자 닉네임을 제공해야 합니다.")
        String followeeNickname,

        @NotBlank(message = "팔로우 대상자 닉네임을 제공해야 합니다.")
        String followerNickname
) {}
