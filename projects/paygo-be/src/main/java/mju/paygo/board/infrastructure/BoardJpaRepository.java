package mju.paygo.board.infrastructure;

import mju.paygo.board.domain.Board;
import mju.paygo.member.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardJpaRepository extends JpaRepository<Board, Long> {
    List<Board> findByMemberId(final Long memberId);
    List<Board> findByMemberNickname(String nickname);
    long countByMember(Member member);
}
