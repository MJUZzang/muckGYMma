package mju.paygo.meal.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.meal.domain.Meal;
import mju.paygo.meal.domain.MealRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class MealRepositoryImpl implements MealRepository {

    private final MealJpaRepository mealJpaRepository;

    @Override
    public Meal save(final Meal meal) {
        return mealJpaRepository.save(meal);
    }

    @Override
    public Optional<Meal> findById(final Long foodId) {
        return mealJpaRepository.findById(foodId);
    }

    @Override
    public List<Meal> findAllByMemberId(final Long memberId) {
        return mealJpaRepository.findAllByMemberId(memberId);
    }
}
