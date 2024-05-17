package mju.paygo.likes.infrastructure;

import mju.paygo.board.domain.Board;
import mju.paygo.likes.domain.Likes;
import mju.paygo.member.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesJpaRepository  extends JpaRepository<Likes, Long> {
    Optional<Likes> findByMemberAndBoard(Member member, Board board);
    void deleteByMemberAndBoard(Member member, Board board);
    long countByBoard(Board board);
}
