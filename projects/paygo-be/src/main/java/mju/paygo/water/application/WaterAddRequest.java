package mju.paygo.water.application;

import jakarta.validation.constraints.NotNull;

public record WaterAddRequest(
        @NotNull(message = "물 양이 정해져야 합니다.")
        Long water
) {
}
