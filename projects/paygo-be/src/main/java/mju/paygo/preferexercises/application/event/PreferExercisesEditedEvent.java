package mju.paygo.preferexercises.application.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mju.paygo.global.event.Event;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class PreferExercisesEditedEvent extends Event {

    private final Long memberId;
    private final List<String> exercisesName;
}
