package mju.paygo.board.application.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mju.paygo.global.event.Event;

@Getter
@RequiredArgsConstructor
public class BoardCreatedEvent extends Event {

    private final Long mealId;
}
