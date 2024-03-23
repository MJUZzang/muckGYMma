package mju.paygo.member.application.auth.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import mju.paygo.global.event.Event;

@Getter
@RequiredArgsConstructor
public class ValidatedLoginEvent extends Event {

    private final String email;
    private final String nickname;
}
