package mju.paygo.food.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.food.domain.FoodLensManager;
import mju.paygo.food.domain.S3Uploader;
import mju.paygo.food.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.food.infrastructure.dto.FoodSearchResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Transactional
@Service
public class FoodService {

    private final FoodLensManager foodLensManager;
    private final S3Uploader s3Uploader;

    public FoodAnalyzeResponse predictFood(final MultipartFile file, final Long userId) {
        String imageUrl = s3Uploader.outerUpload(file, userId);
        FoodAnalyzeResponse response = foodLensManager.predict(file);
        return response.withUrl(imageUrl);
    }

    public FoodSearchResponse searchFoodInFoodLens(final Long foodId) {
        return foodLensManager.searchFoodInFoodLens(foodId);
    }
}
