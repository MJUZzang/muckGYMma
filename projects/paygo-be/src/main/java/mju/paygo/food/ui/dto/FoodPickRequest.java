package mju.paygo.food.ui.dto;

import jakarta.validation.constraints.NotBlank;

public record FoodPickRequest(
        @NotBlank(message = "이미지 url이 있어야 합니다.")
        String imageUrl
) {
}
