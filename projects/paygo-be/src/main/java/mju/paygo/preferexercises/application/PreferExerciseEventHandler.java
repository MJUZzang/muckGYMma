package mju.paygo.preferexercises.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.preferexercises.application.event.PreferExercisesEditedEvent;
import mju.paygo.preferexercises.application.event.PreferExercisesWroteEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class PreferExerciseEventHandler {

    private final PreferExerciseService preferExerciseService;

    @EventListener
    public void handlePreferSportsWriteEvent(final PreferExercisesWroteEvent event) {
        preferExerciseService.create(event.getMemberId(), event.getExercisesName());
    }

    @EventListener
    public void handlePreferSportsEditEvent(final PreferExercisesEditedEvent event) {
        if (event.getExercisesName() == null) {
            return;
        }
        preferExerciseService.edit(event.getMemberId(), event.getExercisesName());
    }
}
