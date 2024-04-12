package mju.paygo.food.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.food.domain.Food;
import mju.paygo.food.domain.FoodRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class FoodRepositoryImpl implements FoodRepository {

    private final FoodJpaRepository foodJpaRepository;

    @Override
    public Food save(final Food food) {
        return foodJpaRepository.save(food);
    }

    @Override
    public Optional<Food> findById(final Long foodId) {
        return foodJpaRepository.findById(foodId);
    }
}
