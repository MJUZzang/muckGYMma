package mju.paygo.comment.domain;

import mju.paygo.board.domain.Board;

import java.util.List;
import java.util.Optional;

public interface CommentRepository {
    Comment save(Comment comment);
    Optional<Comment> findById(Long id);
    void deleteById(Long id);
    List<Comment> findByBoard(Board board);
    long countByBoard(Board board);
}
