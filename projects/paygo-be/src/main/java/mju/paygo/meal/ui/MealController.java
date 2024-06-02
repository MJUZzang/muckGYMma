package mju.paygo.meal.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.meal.application.MealService;
import mju.paygo.meal.domain.Meal;
import mju.paygo.meal.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.meal.infrastructure.dto.FoodPickResponse;
import mju.paygo.meal.ui.dto.MealHistoryResponse;
import mju.paygo.meal.ui.dto.MealPickRequest;
import mju.paygo.meal.ui.dto.TodayMealResponse;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.ZonedDateTime;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/foods")
@RestController
public class MealController {

    private final MealService mealService;

    @PostMapping("/predict")
    public ResponseEntity<FoodAnalyzeResponse> predictFood(@RequestParam("file") final MultipartFile file,
                                                           @AuthMember final Long memberId) {
        FoodAnalyzeResponse response = mealService.predictFood(file, memberId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/pick")
    public ResponseEntity<FoodPickResponse> pickFood(@RequestBody @Valid final MealPickRequest request,
                                                     @AuthMember final Long memberId) {
        FoodPickResponse response = mealService.pickFood(request.id(), memberId, request.imageUrl());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/eaten")
    public ResponseEntity<List<MealHistoryResponse>> eatenFoods(@AuthMember final Long memberId) {
        List<Meal> meals = mealService.findEatenMeals(memberId);
        List<MealHistoryResponse> history = meals.stream()
                .map(MealHistoryResponse::from)
                .toList();

        return ResponseEntity.ok()
                .body(history);
    }

    @GetMapping("/{mealId}")
    public ResponseEntity<MealHistoryResponse> findEatenById(@AuthMember final Long memberId,
                                                             @PathVariable final Long mealId) {
        Meal meal = mealService.findEatenMeal(memberId, mealId);
        return ResponseEntity.ok()
                .body(MealHistoryResponse.from(meal));
    }

    @GetMapping("/today")
    public ResponseEntity<TodayMealResponse> todayMealHistory(@AuthMember final Long memberId) {
        List<Meal> meals = mealService.findTodayEatenMeal(memberId);
        return ResponseEntity.ok()
                .body(TodayMealResponse.from(meals));
    }

    @GetMapping("/last")
    public ResponseEntity<ZonedDateTime> timeFromLastAte(@AuthMember final Long memberId) {
        ZonedDateTime time = mealService.lastAteEatenMeal(memberId);
        return ResponseEntity.ok()
                .body(time);
    }
}
