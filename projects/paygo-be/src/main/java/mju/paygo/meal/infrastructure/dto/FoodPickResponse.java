package mju.paygo.meal.infrastructure.dto;

import mju.paygo.meal.domain.Meal;

import java.math.BigDecimal;

public record FoodPickResponse(
        Long id,
        Long[] foodLensId,
        String foodName,
        BigDecimal kcal,
        BigDecimal carbo,
        BigDecimal fat,
        BigDecimal gram,
        BigDecimal sodium,
        BigDecimal protein
) {

    public static FoodPickResponse from(final Meal meal, final Long[] foodLensIds) {
        return new FoodPickResponse(
                meal.getId(),
                foodLensIds,
                meal.getFoodName(),
                meal.getNutrient().getKcal(),
                meal.getNutrient().getCarbo(),
                meal.getNutrient().getFat(),
                meal.getNutrient().getGram(),
                meal.getNutrient().getSodium(),
                meal.getNutrient().getProtein()
        );
    }
}
