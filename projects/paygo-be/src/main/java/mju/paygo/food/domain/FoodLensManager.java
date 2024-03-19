package mju.paygo.food.domain;

import mju.paygo.food.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.food.infrastructure.dto.FoodSearchResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FoodLensManager {

    FoodAnalyzeResponse predict(final MultipartFile file);

    FoodSearchResponse searchFoodInFoodLens(final Long foodId);
}
