package mju.paygo.food.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.food.infrastructure.dto.FoodSearchResponse;

import java.math.BigDecimal;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Embeddable
public class Nutrient {

    @Column(nullable = false)
    private BigDecimal kcal;

    @Column(nullable = false)
    private BigDecimal carbo;

    @Column(nullable = false)
    private BigDecimal protein;

    @Column(nullable = false)
    private BigDecimal fat;

    @Column(nullable = false)
    private BigDecimal sodium;

    @Column(nullable = false)
    private BigDecimal gram;

    public static Nutrient from(final FoodSearchResponse response) {
        return new Nutrient(
                response.kcal(),
                response.carbo(),
                response.protein(),
                response.fat(),
                response.sodium(),
                response.gram()
        );
    }
}
