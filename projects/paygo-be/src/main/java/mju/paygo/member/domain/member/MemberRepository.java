package mju.paygo.member.domain.member;

import java.util.Optional;

public interface MemberRepository {

    Optional<Member> findById(final Long id);

    Optional<Member> findByEmail(final String email);

    Member save(final Member member);

    boolean existsByEmail(final String email);
}
