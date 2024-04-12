package mju.paygo.food.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.food.domain.Food;
import mju.paygo.food.domain.FoodLensManager;
import mju.paygo.food.domain.FoodRepository;
import mju.paygo.food.domain.S3Uploader;
import mju.paygo.food.domain.vo.Nutrient;
import mju.paygo.food.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.food.infrastructure.dto.FoodSearchResponse;
import mju.paygo.food.infrastructure.dto.FoodPickResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Transactional
@Service
public class FoodService {

    private final FoodLensManager foodLensManager;
    private final FoodRepository foodRepository;
    private final S3Uploader s3Uploader;

    public FoodAnalyzeResponse predictFood(final MultipartFile file, final Long userId) {
        String imageUrl = s3Uploader.outerUpload(file, userId);
        FoodAnalyzeResponse response = foodLensManager.predict(file);
        return response.withUrl(imageUrl);
    }

    // 음식 후보 중 최종 음식 확정 API
    public FoodPickResponse pickFood(final Long foodLensId, final Long userId, final String imageUrl) {
        FoodSearchResponse response = foodLensManager.searchFoodInFoodLens(foodLensId);
        Nutrient nutrient = Nutrient.from(response);
        Food food = Food.of(userId, nutrient, foodLensId, response.foodName(), imageUrl);
        foodRepository.save(food);

        return FoodPickResponse.from(food);
    }

    public FoodSearchResponse searchFoodInFoodLens(final Long foodId) {
        return foodLensManager.searchFoodInFoodLens(foodId);
    }
}
