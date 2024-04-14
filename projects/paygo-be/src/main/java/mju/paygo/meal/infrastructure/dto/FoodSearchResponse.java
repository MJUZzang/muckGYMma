package mju.paygo.meal.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public record FoodSearchResponse(
        @JsonProperty("foodname")
        String foodName,

        @JsonProperty("calories")
        BigDecimal kcal,

        @JsonProperty("carbonhydrate")
        BigDecimal carbo,

        @JsonProperty("protein")
        BigDecimal protein,

        @JsonProperty("fat")
        BigDecimal fat,

        @JsonProperty("sodium")
        BigDecimal sodium,

        @JsonProperty("totalgram")
        BigDecimal gram
) {
}
