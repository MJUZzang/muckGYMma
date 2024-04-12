package mju.paygo.food.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record FoodAnalyzeResponse(

        String fileUrl,
        @JsonProperty("predictlist")
        List<PossibleCandidateFoodResponse> possibles
) {
        public FoodAnalyzeResponse withUrl(final String url) {
                return new FoodAnalyzeResponse(url, possibles);
        }
}
