package mju.paygo.member.infrastructure.member;

import mju.paygo.member.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(final String email);

    boolean existsByEmail(final String email);

    boolean existsByNickname(final String nickname);

    Optional<Member> findByNickname(String nickname);
}
