package mju.paygo.prefersports.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.prefersports.application.event.PreferSportsEditedEvent;
import mju.paygo.prefersports.application.event.PreferSportsWroteEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class PreferSportsEventHandler {

    private final PreferSportsService preferSportsService;

    @EventListener
    public void handlePreferSportsWriteEvent(final PreferSportsWroteEvent event) {
        preferSportsService.create(event.getMemberId(), event.getSportsName());
    }

    @EventListener
    public void handlePreferSportsEditEvent(final PreferSportsEditedEvent event) {
        if (event.getSportsName() == null) {
            return;
        }
        preferSportsService.edit(event.getMemberId(), event.getSportsName());
    }
}
