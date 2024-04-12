package mju.paygo.food.domain;

import java.util.Optional;

public interface FoodRepository {

    Food save(Food food);
    Optional<Food> findById(Long foodId);
}
