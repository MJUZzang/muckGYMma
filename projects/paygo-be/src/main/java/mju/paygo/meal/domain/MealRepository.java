package mju.paygo.meal.domain;

import java.util.List;
import java.util.Optional;

public interface MealRepository {

    Meal save(Meal meal);
    Optional<Meal> findById(Long mealId);
    List<Meal> findAllByMemberId(Long memberId);
    List<Meal> findAllByMemberIdAndToday(Long memberId);
    Optional<Meal> findByMemberAndId(Long memberId, Long mealId);
    Optional<Meal> findByImageUrl(String imageUrl);
}
