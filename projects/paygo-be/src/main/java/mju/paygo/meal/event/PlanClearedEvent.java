package mju.paygo.meal.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mju.paygo.global.event.Event;

@Getter
@RequiredArgsConstructor
public class PlanClearedEvent extends Event {

    private final Long memberId;
    private final Long mealId;
}
