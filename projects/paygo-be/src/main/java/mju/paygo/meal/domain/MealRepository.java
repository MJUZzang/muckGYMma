package mju.paygo.meal.domain;

import java.util.Optional;

public interface MealRepository {

    Meal save(Meal meal);
    Optional<Meal> findById(Long foodId);
}
