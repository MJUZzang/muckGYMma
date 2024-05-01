package mju.paygo.member.ui.member.dto;

import jakarta.validation.Valid;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileCreateRequest;

public record MemberInitializeRequest(

        @Valid
        PhysicalProfileCreateRequest physical
) {
}
