package mju.paygo.comment.infrastructure;

import mju.paygo.board.domain.Board;
import mju.paygo.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentJpaRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoard(final Board board);
    long countByBoard(final Board board);
    List<Comment> findByBoardId(Long boardId);
}
