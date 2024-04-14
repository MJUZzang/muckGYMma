package mju.paygo.meal.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.List;

public record PossibleCandidateFoodResponse(
        @JsonProperty("keyname")
        String keyName,

        @JsonProperty("foodlist")
        List<FoodInfoResponse> foods,

        @JsonProperty("possibility")
        BigDecimal possibility
) {
}
