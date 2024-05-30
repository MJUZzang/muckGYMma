package mju.paygo.board.infrastructure;

import mju.paygo.board.domain.Board;
import mju.paygo.member.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardJpaRepository extends JpaRepository<Board, Long> {
    List<Board> findByMemberId(final Long memberId);
    List<Board> findByMemberNickname(final String nickname);
    long countByMember(final Member member);
    Optional<Board> findByIdAndMemberId(final Long id, final Long memberId);
    Optional<Board> findByMealId(Long mealId);
    List<Board> findByMemberIn(List<Member> members);
}
