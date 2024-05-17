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
    public Comment save(Comment comment) {
        return commentJpaRepository.save(comment);
    }

    @Override
    public Optional<Comment> findById(Long id) {
        return commentJpaRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        commentJpaRepository.deleteById(id);
    }

    @Override
    public List<Comment> findByBoard(Board board) {
        return commentJpaRepository.findByBoard(board);
    }

    @Override
    public long countByBoard(Board board) {
        return commentJpaRepository.countByBoard(board);
    }
}