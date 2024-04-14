package mju.paygo.meal.ui.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FoodPickRequest(

        @NotNull(message = "음식 id가 최소 하나 이상 있어야 합니다.")
        Long[] id,

        @NotBlank(message = "이미지 url이 있어야 합니다.")
        String imageUrl
) {
}
