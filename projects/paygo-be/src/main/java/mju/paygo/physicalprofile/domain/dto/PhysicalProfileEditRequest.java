package mju.paygo.physicalprofile.domain.dto;

import java.math.BigDecimal;

public record PhysicalProfileEditRequest(
        String birth,
        String gender,
        BigDecimal weight,
        BigDecimal height
) {
}
