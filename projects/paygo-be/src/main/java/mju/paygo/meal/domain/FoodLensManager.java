package mju.paygo.meal.domain;

import mju.paygo.meal.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.meal.infrastructure.dto.FoodSearchResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FoodLensManager {

    FoodAnalyzeResponse predict(final MultipartFile file);

    FoodSearchResponse searchFoodInFoodLens(final Long[] foodIds);
}
