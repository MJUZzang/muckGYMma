package mju.paygo.meal.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.meal.application.MealService;
import mju.paygo.meal.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.meal.infrastructure.dto.FoodPickResponse;
import mju.paygo.meal.ui.dto.FoodPickRequest;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/api/food")
@RestController
public class FoodController {

    private final MealService mealService;

    @PostMapping("/predict")
    public ResponseEntity<FoodAnalyzeResponse> predictFood(@RequestParam("file") final MultipartFile file,
                                                           @AuthMember final Long memberId) {
        FoodAnalyzeResponse response = mealService.predictFood(file, memberId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("pick")
    public ResponseEntity<FoodPickResponse> pickFood(@RequestBody @Valid final FoodPickRequest request,
                                                     @AuthMember final Long memberId) {
        FoodPickResponse response = mealService.pickFood(request.id(), memberId, request.imageUrl());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }
}
