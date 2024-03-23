package mju.paygo.member.application.member;

import lombok.RequiredArgsConstructor;
import mju.paygo.member.application.auth.event.ValidatedLoginEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MemberEventHandler {

    private final MemberService memberService;

    @EventListener
    public void registerIfNotMemberExist(final ValidatedLoginEvent event) {
        memberService.create(event.getEmail(), event.getNickname());
    }
}
