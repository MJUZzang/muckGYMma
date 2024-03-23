package mju.paygo.member.application.member;

import lombok.RequiredArgsConstructor;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
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
}
