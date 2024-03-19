package mju.paygo.food.ui;

import lombok.RequiredArgsConstructor;
import mju.paygo.food.application.FoodService;
import mju.paygo.food.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.food.infrastructure.dto.FoodSearchResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/api/food")
@RestController
public class FoodController {

    private final FoodService foodService;

    @PostMapping("/predict")
    public ResponseEntity<FoodAnalyzeResponse> predictFood(@RequestParam("file") final MultipartFile file) {
        FoodAnalyzeResponse response = foodService.predictFood(file);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/search/{foodId}")
    public ResponseEntity<FoodSearchResponse> searchFoodInFoodLens(@PathVariable final Long foodId) {
        FoodSearchResponse response = foodService.searchFoodInFoodLens(foodId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }
}
