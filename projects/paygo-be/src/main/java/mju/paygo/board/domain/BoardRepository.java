package mju.paygo.board.domain;

import mju.paygo.member.domain.member.Member;

import java.util.List;
import java.util.Optional;

public interface BoardRepository {
    List<Board> findAll();
    List<Board> findByMemberId(final Long memberId);
    List<Board> findAllExceptMemberId(final Long memberId);
    Board save(final Board board);
    void delete(final Board board);
    Optional<Board> findById(final Long id);
    void deleteById(final Long id);
    List<Board> findByMemberNickname(final String nickname);
    long countByMember(final Member member);
    Optional<Board> findByIdAndMemberId(final Long id, final Long memberId);
}
