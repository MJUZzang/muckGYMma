package mju.paygo.member.application.member;

import lombok.RequiredArgsConstructor;
import mju.paygo.global.event.Events;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.physicalprofile.application.event.PhysicalProfileCreatedEvent;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileCreateRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void create(final String email, final String nickname) {
        if (!memberRepository.existsByEmail(email)) {
            memberRepository.save(Member.createWithOAuthLogin(email, nickname));
        }
    }

    @Transactional
    public void writePhysicalProfile(final Long memberId, final PhysicalProfileCreateRequest request) {
        Events.raise(new PhysicalProfileCreatedEvent(memberId, request));
    }
}
