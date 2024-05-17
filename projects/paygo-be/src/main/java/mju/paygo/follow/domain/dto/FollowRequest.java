package mju.paygo.follow.domain.dto;

import jakarta.validation.constraints.NotNull;

public record FollowRequest(
        @NotNull(message = "팔로우 대상 ID를 제공해야 합니다.")
        Long followeeId
) {}
