package mju.paygo.plan.application.dto;

import jakarta.validation.constraints.NotNull;

public record MealPlanFindRequest(
        @NotNull(message = "식단 id가 있어야 합니다.")
        Long mealId
) {
}
