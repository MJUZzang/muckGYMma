package mju.paygo.member.domain.member;

import mju.paygo.member.infrastructure.member.dto.MemberSettingResponse;

import java.util.Optional;

public interface MemberRepository {

    Optional<Member> findById(final Long id);

    Optional<Member> findByEmail(final String email);

    Member save(final Member member);

    boolean existsByEmail(final String email);

    boolean existsByNickname(final String nickname);

    MemberSettingResponse viewSetting(final Long memberId);

    Optional<Member> findByNickname(String nickname);
}
