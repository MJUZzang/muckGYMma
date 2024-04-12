package mju.paygo.food.infrastructure;

import mju.paygo.food.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodJpaRepository extends JpaRepository<Food, Long> {
}
