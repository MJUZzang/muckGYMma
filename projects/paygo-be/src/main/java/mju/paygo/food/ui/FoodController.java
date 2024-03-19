package mju.paygo.food.ui;

import lombok.RequiredArgsConstructor;
import mju.paygo.food.application.FoodService;
import mju.paygo.food.infrastructure.dto.FoodAnalyzeResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
