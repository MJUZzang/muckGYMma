package mju.paygo.meal.domain;

import java.util.List;
import java.util.Optional;

public interface MealRepository {

    Meal save(Meal meal);
    Optional<Meal> findById(Long foodId);
    List<Meal> findAllByMemberId(Long memberId);
}
