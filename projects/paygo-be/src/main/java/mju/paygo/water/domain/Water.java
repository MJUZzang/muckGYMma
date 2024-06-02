package mju.paygo.water.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.global.domain.BaseEntity;

import java.time.ZonedDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Water extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long water;

    private Water(final ZonedDateTime createdAt, final ZonedDateTime updatedAt, final Long memberId, final Long water) {
        super(createdAt, updatedAt);
        this.memberId = memberId;
        this.water = water;
    }

    public static Water createDefault(final Long memberId) {
        return new Water(ZonedDateTime.now(), ZonedDateTime.now(), memberId, 0L);
    }

    public void addWater(final Long water) {
        this.water += water;
    }
}
