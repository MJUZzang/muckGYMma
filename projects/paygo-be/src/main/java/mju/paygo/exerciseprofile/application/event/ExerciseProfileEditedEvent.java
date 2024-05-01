package mju.paygo.exerciseprofile.application.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileEditRequest;
import mju.paygo.global.event.Event;

@Getter
@RequiredArgsConstructor
public class ExerciseProfileEditedEvent extends Event {

    private final Long memberId;
    private final ExerciseProfileEditRequest request;
}
