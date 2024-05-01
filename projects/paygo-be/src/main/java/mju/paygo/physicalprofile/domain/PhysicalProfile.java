package mju.paygo.physicalprofile.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileCreateRequest;
import mju.paygo.physicalprofile.domain.vo.Birth;
import mju.paygo.physicalprofile.domain.vo.Gender;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PhysicalProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Embedded
    @Column(nullable = false)
    private Birth birth;

    @Column(nullable = false)
    private BigDecimal weight;

    @Column(nullable = false)
    private BigDecimal height;

    private PhysicalProfile(final Long memberId, final Gender gender, final Birth birth, final BigDecimal weight, final BigDecimal height) {
        this.memberId = memberId;
        this.gender = gender;
        this.birth = birth;
        this.weight = weight;
        this.height = height;
    }

    public static PhysicalProfile from(final Long memberId, final PhysicalProfileCreateRequest request) {
        Gender gender = Gender.findByName(request.gender());
        Birth birth = Birth.from(request.birth());
        return new PhysicalProfile(memberId, gender, birth, request.weight(), request.height());
    }
}
