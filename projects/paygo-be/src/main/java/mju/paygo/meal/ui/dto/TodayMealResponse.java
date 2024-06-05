package mju.paygo.meal.ui.dto;

import mju.paygo.meal.domain.Meal;

import java.math.BigDecimal;
import java.util.List;

public record TodayMealResponse(
        BigDecimal todayKcal,
        String lastMealName
) {

    public static TodayMealResponse from(final List<Meal> meals) {
        BigDecimal kcal = meals.stream()
                .map(meal -> meal.getNutrient().getKcal())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        String lastMealName = meals.isEmpty() ? "" : meals.get(meals.size() - 1).getMealName();

        return new TodayMealResponse(kcal, lastMealName);
    }
}
