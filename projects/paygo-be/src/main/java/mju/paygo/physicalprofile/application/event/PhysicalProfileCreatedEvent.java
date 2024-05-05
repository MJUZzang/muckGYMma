package mju.paygo.physicalprofile.application.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mju.paygo.global.event.Event;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileCreateRequest;

@Getter
@RequiredArgsConstructor
public class PhysicalProfileCreatedEvent extends Event {

    private final Long memberId;
    private final PhysicalProfileCreateRequest request;
}
