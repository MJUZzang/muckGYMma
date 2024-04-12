package mju.paygo.food.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record FoodInfoResponse(
        @JsonProperty("id")
        Long id,

        @JsonProperty("foodname")
        String foodName,

        @JsonProperty("manufacturer")
        String manufacturer,

        @JsonProperty("predict_key")
        String predictKey
) {
}
