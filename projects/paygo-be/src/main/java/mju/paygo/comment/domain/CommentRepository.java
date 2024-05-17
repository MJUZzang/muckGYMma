package mju.paygo.comment.domain;

import mju.paygo.board.domain.Board;

import java.util.List;
import java.util.Optional;

public interface CommentRepository {
    Comment save(final Comment comment);
    Optional<Comment> findById(final Long id);
    void deleteById(final Long id);
    List<Comment> findByBoard(final Board board);
    long countByBoard(final Board board);
    void delete(final Comment comment);
}
