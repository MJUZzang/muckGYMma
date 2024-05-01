package mju.paygo.exerciseprofile.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.exerciseprofile.application.event.ExerciseProfileCreatedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ExerciseProfileEventHandler {

    private final ExerciseProfileService exerciseProfileService;

    @EventListener(ExerciseProfileCreatedEvent.class)
    public void handleExerciseProfileWroteEvent(final ExerciseProfileCreatedEvent event) {
        exerciseProfileService.writeExerciseProfile(event.getMemberId(), event.getRequest());
    }

}
