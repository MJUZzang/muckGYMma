package mju.paygo.food.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.food.domain.vo.Nutrient;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Embedded
    @Column(nullable = false)
    private Nutrient nutrient;

    @Column(nullable = false)
    private Long foodLensId;

    @Column(nullable = false)
    private String foodName;

    @Column(nullable = false)
    private String imageUrl;

    private Food(final Long memberId, final Nutrient nutrient, final Long foodLensId, final String foodName, final String imageUrl) {
        this.memberId = memberId;
        this.nutrient = nutrient;
        this.foodLensId = foodLensId;
        this.foodName = foodName;
        this.imageUrl = imageUrl;
    }

    public static Food of(final Long memberId, final Nutrient nutrient, final Long foodLensId, final String foodName, final String imageUrl) {
        return new Food(memberId, nutrient, foodLensId, foodName, imageUrl);
    }
}
