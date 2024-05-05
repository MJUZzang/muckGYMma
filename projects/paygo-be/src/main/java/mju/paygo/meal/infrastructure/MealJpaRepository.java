package mju.paygo.meal.infrastructure;

import mju.paygo.meal.domain.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealJpaRepository extends JpaRepository<Meal, Long> {

    List<Meal> findAllByMemberId(Long memberId);
}
