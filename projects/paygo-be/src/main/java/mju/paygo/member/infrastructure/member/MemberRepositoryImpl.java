package mju.paygo.member.infrastructure.member;

import lombok.RequiredArgsConstructor;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class MemberRepositoryImpl implements MemberRepository {

    private final MemberJpaRepository memberJpaRepository;

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
}