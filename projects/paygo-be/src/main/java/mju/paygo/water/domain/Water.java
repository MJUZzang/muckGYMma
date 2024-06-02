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

import java.time.LocalDateTime;

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

    private Water(final LocalDateTime createdAt, final LocalDateTime updatedAt, final Long memberId, final Long water) {
        super(createdAt, updatedAt);
        this.memberId = memberId;
        this.water = water;
    }

    public static Water createDefault(final Long memberId) {
        return new Water(LocalDateTime.now(), LocalDateTime.now(), memberId, 0L);
    }

    public void addWater(final Long water) {
        this.water += water;
    }
}
