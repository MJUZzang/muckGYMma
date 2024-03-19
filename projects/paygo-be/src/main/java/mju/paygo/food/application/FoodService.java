package mju.paygo.food.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.food.infrastructure.FoodLensManagerImpl;
import mju.paygo.food.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.food.infrastructure.dto.FoodSearchResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Transactional
@Service
public class FoodService {

    private final FoodLensManagerImpl foodLensManager;

    public FoodAnalyzeResponse predictFood(final MultipartFile file) {
        return foodLensManager.predict(file);
    }

    public FoodSearchResponse searchFoodInFoodLens(final Long foodId) {
        return foodLensManager.searchFoodInFoodLens(foodId);
    }
}
