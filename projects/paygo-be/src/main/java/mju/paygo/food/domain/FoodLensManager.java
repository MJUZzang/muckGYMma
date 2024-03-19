package mju.paygo.food.domain;

import mju.paygo.food.infrastructure.dto.FoodAnalyzeResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FoodLensManager {

    FoodAnalyzeResponse predict(final MultipartFile file);
}
