package mju.paygo.meal.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.meal.domain.FoodLensManager;
import mju.paygo.meal.domain.Meal;
import mju.paygo.meal.domain.MealRepository;
import mju.paygo.meal.domain.S3Uploader;
import mju.paygo.meal.domain.vo.Nutrient;
import mju.paygo.meal.exception.exceptions.MealNotFoundException;
import mju.paygo.meal.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.meal.infrastructure.dto.FoodPickResponse;
import mju.paygo.meal.infrastructure.dto.FoodSearchResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class MealService {

    private final FoodLensManager foodLensManager;
    private final MealRepository mealRepository;
    private final S3Uploader s3Uploader;

    public FoodAnalyzeResponse predictFood(final MultipartFile file, final Long memberId) {
        String imageUrl = s3Uploader.outerUpload(file, memberId);
        FoodAnalyzeResponse response = foodLensManager.predict(file);
        return response.withUrl(imageUrl);
    }

    // 음식 후보 중 최종 음식 확정 API
    public FoodPickResponse pickFood(final Long[] foodLensIds, final Long memberId, final String imageUrl) {
        FoodSearchResponse response = foodLensManager.searchFoodInFoodLens(foodLensIds);
        Nutrient nutrient = Nutrient.from(response);
        Meal meal = Meal.of(memberId, nutrient, response.foodName(), imageUrl);
        mealRepository.save(meal);

        return FoodPickResponse.from(meal, foodLensIds);
    }

    public List<Meal> findEatenMeals(final Long memberId) {
        return mealRepository.findAllByMemberId(memberId);
    }

    public void clearMealPlan(final Long memberId, final Long mealId) {
        Meal meal = mealRepository.findByMemberAndId(memberId, mealId)
                .orElseThrow(MealNotFoundException::new);
        meal.clearExercise();
    }
}
