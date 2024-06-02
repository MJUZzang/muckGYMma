package mju.paygo.meal.infrastructure;

import mju.paygo.meal.domain.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MealJpaRepository extends JpaRepository<Meal, Long> {

    List<Meal> findAllByMemberId(Long memberId);

    @Query("SELECT m FROM Meal m WHERE m.memberId = :memberId AND m.id = :mealId")
    Optional<Meal> findByMemberAndId(Long memberId, Long mealId);

    @Query("SELECT m FROM Meal m WHERE m.memberId = :memberId AND m.createdAt BETWEEN :start AND :end")
    List<Meal> findAllByMemberIdAndToday(Long memberId, LocalDateTime start, LocalDateTime end);

    @Query("SELECT m FROM Meal m WHERE m.memberId =:memberId ORDER BY m.createdAt DESC")
    Optional<Meal> findLastAteMeal(Long memberId);

    Optional<Meal> findByImageUrl(String imageUrl);
}
