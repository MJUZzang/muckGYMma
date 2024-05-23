package mju.paygo.meal.ui.dto;

import mju.paygo.meal.domain.Meal;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record MealHistoryResponse(
        Long id,
        String name,
        BigDecimal kcal,
        BigDecimal carbo,
        BigDecimal protein,
        BigDecimal fat,
        BigDecimal sodium,
        BigDecimal gram,
        String imageUrl,
        Boolean exercised,
        Boolean posted,
        Boolean planed,
        LocalDateTime createdAt
) {

    public static MealHistoryResponse from(final Meal meal) {
        return new MealHistoryResponse(
                meal.getId(),
                meal.getMealName(),
                meal.getNutrient().getKcal(),
                meal.getNutrient().getCarbo(),
                meal.getNutrient().getProtein(),
                meal.getNutrient().getFat(),
                meal.getNutrient().getSodium(),
                meal.getNutrient().getGram(),
                meal.getImageUrl(),
                meal.getExercised(),
                meal.getPosted(),
                meal.getPlaned(),
                meal.getCreatedAt()
        );
    }
}
