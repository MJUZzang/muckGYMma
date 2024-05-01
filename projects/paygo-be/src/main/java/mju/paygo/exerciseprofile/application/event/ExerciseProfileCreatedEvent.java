package mju.paygo.exerciseprofile.application.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileCreateRequest;
import mju.paygo.global.event.Event;

@Getter
@RequiredArgsConstructor
public class ExerciseProfileCreatedEvent extends Event {

    private final Long memberId;
    private final ExerciseProfileCreateRequest request;
}
