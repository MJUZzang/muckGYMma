package mju.paygo.meal.application;

import devholic.library.discordbot.DiscordSender;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class MealService {

    @Value("${discord.url}")
    private String url;

    private final FoodLensManager foodLensManager;
    private final MealRepository mealRepository;
    private final S3Uploader s3Uploader;

    public FoodAnalyzeResponse predictFood(final MultipartFile file, final Long memberId) {
        String imageUrl = s3Uploader.outerUpload(file, memberId);
        FoodAnalyzeResponse response = foodLensManager.predict(file);
        DiscordSender discordSender = new DiscordSender(url);
        try {
            discordSender.send("음식 predict 진행");
        } catch (IOException ignored) {
        }
        return response.withUrl(imageUrl);
    }

    // 음식 후보 중 최종 음식 확정 API
    public FoodPickResponse pickFood(final Long[] foodLensIds, final Long memberId, final String imageUrl) {
        FoodSearchResponse response = foodLensManager.searchFoodInFoodLens(foodLensIds);
        Nutrient nutrient = Nutrient.from(response);
        Meal meal = Meal.of(memberId, nutrient, response.foodName(), imageUrl);
        mealRepository.save(meal);
        DiscordSender discordSender = new DiscordSender(url);
        try {
            discordSender.send("음식 predict pick");
        } catch (IOException ignored) {
        }
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

    public Meal findEatenMeal(final Long memberId, final Long mealId) {
        return mealRepository.findByMemberAndId(memberId, mealId)
                .orElseThrow(MealNotFoundException::new);
    }

    public List<Meal> findTodayEatenMeal(final Long memberId) {
        return mealRepository.findAllByMemberIdAndToday(memberId);
    }

    public LocalDateTime lastAteEatenMeal(final Long memberId) {
        Optional<Meal> meal = mealRepository.findLastAteMeal(memberId);
        if (meal.isEmpty()) {
            return null;
        }
        return meal.get().getCreatedAt();
    }
}
