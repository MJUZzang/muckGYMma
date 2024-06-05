package mju.paygo.meal.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.meal.domain.Meal;
import mju.paygo.meal.domain.MealRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
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
    public List<Meal> findAllByMemberIdAndToday(final Long memberId) {
        ZonedDateTime start = getStartOfDayZoned();
        ZonedDateTime end = getEndOfDayZoned();

        return mealJpaRepository.findAllByMemberIdAndToday(memberId, start, end);
    }

    private ZonedDateTime getStartOfDayZoned() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        ZoneId zoneId = ZoneId.systemDefault();
        return startOfDay.atZone(zoneId);
    }

    private ZonedDateTime getEndOfDayZoned() {
        LocalDate today = LocalDate.now();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);
        ZoneId zoneId = ZoneId.systemDefault();
        return endOfDay.atZone(zoneId);
    }

    @Override
    public Optional<Meal> findByMemberAndId(final Long memberId, final Long mealId) {
        return mealJpaRepository.findByMemberAndId(memberId, mealId);
    }

    @Override
    public Optional<Meal> findByImageUrl(String imageUrl) {
        return Optional.empty();
    }

    @Override
    public Optional<Meal> findLastAteMeal(final Long memberId) {
        return mealJpaRepository.findLastAteMeal(memberId);
    }
}
