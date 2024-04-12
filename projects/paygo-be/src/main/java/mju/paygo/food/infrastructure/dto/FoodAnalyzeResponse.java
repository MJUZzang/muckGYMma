package mju.paygo.food.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record FoodAnalyzeResponse(
        @JsonProperty("filename")
        String fileName,

        @JsonProperty("predictlist")
        List<PossibleCandidateFoodResponse> possibles
) {
}
