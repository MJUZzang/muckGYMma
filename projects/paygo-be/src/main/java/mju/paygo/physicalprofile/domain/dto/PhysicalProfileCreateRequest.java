package mju.paygo.physicalprofile.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PhysicalProfileCreateRequest(

        @NotBlank(message = "생년월일이 입력되어야 합니다.")
        String birth,

        @NotBlank(message = "성별이 입력되어야 합니다.")
        String gender,

        @NotNull(message = "체중이 입력되어야 합니다.")
        BigDecimal weight,

        @NotNull(message = "신장이 입력되어야 합니다.")
        BigDecimal height
) {
}
