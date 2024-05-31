package mju.paygo.member.infrastructure.member.dto;

import lombok.Getter;
import mju.paygo.physicalprofile.domain.vo.Birth;
import mju.paygo.physicalprofile.domain.vo.Gender;

import java.math.BigDecimal;

@Getter
public class PhysicalSettingResponse {

    String birth;
    String gender;
    BigDecimal weight;
    BigDecimal height;

    public PhysicalSettingResponse(final Birth birth, final Gender gender, final BigDecimal weight, final BigDecimal height) {
        this.birth = birth.getBirthDate();
        this.gender = gender.getName();
        this.weight = weight;
        this.height = height;
    }
}
