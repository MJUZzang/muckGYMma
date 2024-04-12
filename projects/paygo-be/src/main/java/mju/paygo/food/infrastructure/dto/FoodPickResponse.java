package mju.paygo.food.infrastructure.dto;

import mju.paygo.food.domain.Food;

import java.math.BigDecimal;

public record FoodPickResponse(
        Long id,
        Long foodLensId,
        String foodName,
        BigDecimal kcal,
        BigDecimal carbo,
        BigDecimal fat,
        BigDecimal gram,
        BigDecimal sodium,
        BigDecimal protein
) {

    public static FoodPickResponse from(final Food food) {
        return new FoodPickResponse(
                food.getId(),
                food.getFoodLensId(),
                food.getFoodName(),
                food.getNutrient().getKcal(),
                food.getNutrient().getCarbo(),
                food.getNutrient().getFat(),
                food.getNutrient().getGram(),
                food.getNutrient().getSodium(),
                food.getNutrient().getProtein()
        );
    }
}
