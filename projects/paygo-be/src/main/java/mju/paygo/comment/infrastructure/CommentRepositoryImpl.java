package mju.paygo.comment.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.comment.domain.Comment;
import mju.paygo.comment.domain.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class CommentRepositoryImpl implements CommentRepository {

    @Autowired
    private final CommentJpaRepository commentJpaRepository;

    @Override
    public Comment save(final Comment comment) {
        return commentJpaRepository.save(comment);
    }

    @Override
    public Optional<Comment> findById(final Long id) {
        return commentJpaRepository.findById(id);
    }

    @Override
    public void deleteById(final Long id) {
        commentJpaRepository.deleteById(id);
    }

    @Override
    public List<Comment> findByBoard(final Board board) {
        return commentJpaRepository.findByBoard(board);
    }

    @Override
    public long countByBoard(final Board board) {
        return commentJpaRepository.countByBoard(board);
    }

    @Override
    public void delete(final Comment comment) {
        commentJpaRepository.delete(comment);
    }

    @Override
    public List<Comment> findCommentsByBoardId(Long boardId) {
        return commentJpaRepository.findByBoardId(boardId);
    }
}
