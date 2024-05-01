package mju.paygo.physicalprofile.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.physicalprofile.application.event.PhysicalProfileCreatedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class PhysicalProfileEventHandler {

    private final PhysicalProfileService physicalProfileService;

    @EventListener
    public void handlePhysicalProfileWriteEvent(final PhysicalProfileCreatedEvent event) {
        physicalProfileService.writePhysicalProfile(event.getMemberId(), event.getRequest());
    }
}
