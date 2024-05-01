package mju.paygo.physicalprofile.application.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mju.paygo.global.event.Event;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileEditRequest;

@Getter
@RequiredArgsConstructor
public class PhysicalProfileEditedEvent extends Event {

    private final Long memberId;
    private final PhysicalProfileEditRequest request;
}
