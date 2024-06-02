package mju.paygo.likes.infrastructure;

import mju.paygo.board.domain.Board;
import mju.paygo.likes.domain.Likes;
import mju.paygo.member.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikesJpaRepository  extends JpaRepository<Likes, Long> {
    Optional<Likes> findByMemberAndBoard(final Member member, final Board board);
    void deleteByMemberAndBoard(final Member member, final Board board);
    long countByBoard(final Board board);
    List<Likes> findByBoardId(Long boardId);
}
