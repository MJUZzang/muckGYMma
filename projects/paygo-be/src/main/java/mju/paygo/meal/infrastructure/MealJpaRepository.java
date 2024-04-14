package mju.paygo.meal.infrastructure;

import mju.paygo.meal.domain.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealJpaRepository extends JpaRepository<Meal, Long> {
}
