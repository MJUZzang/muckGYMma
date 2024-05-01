package mju.paygo.prefersports.application.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mju.paygo.global.event.Event;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class PreferSportsEditedEvent extends Event {

    private final Long memberId;
    private final List<String> sportsName;
}
