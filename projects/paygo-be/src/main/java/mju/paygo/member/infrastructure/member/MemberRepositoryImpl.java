package mju.paygo.member.infrastructure.member;

import lombok.RequiredArgsConstructor;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.member.infrastructure.member.dto.MemberSettingResponse;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class MemberRepositoryImpl implements MemberRepository {

    private final MemberJpaRepository memberJpaRepository;
    private final MemberQueryRepository memberQueryRepository;

    @Override
    public Optional<Member> findById(final Long id) {
        return memberJpaRepository.findById(id);
    }

    @Override
    public Optional<Member> findByEmail(final String email) {
        return memberJpaRepository.findByEmail(email);
    }

    @Override
    public Member save(final Member member) {
        return memberJpaRepository.save(member);
    }

    @Override
    public boolean existsByEmail(final String email) {
        return memberJpaRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByNickname(final String nickname) {
        return memberJpaRepository.existsByNickname(nickname);
    }

    @Override
    public MemberSettingResponse viewSetting(final Long memberId) {
        return memberQueryRepository.viewSetting(memberId);
    }
}
