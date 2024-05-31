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
    public Optional<Meal> findById(final Long mealId) {
        return mealJpaRepository.findById(mealId);
    }

    @Override
    public List<Meal> findAllByMemberId(final Long memberId) {
        return mealJpaRepository.findAllByMemberId(memberId);
    }

    @Override
    public Optional<Meal> findByMemberAndId(final Long memberId, final Long mealId) {
        return mealJpaRepository.findByMemberAndId(memberId, mealId);
    }

    @Override
    public Optional<Meal> findByImageUrl(String imageUrl) {
        return Optional.empty();
    }
}
