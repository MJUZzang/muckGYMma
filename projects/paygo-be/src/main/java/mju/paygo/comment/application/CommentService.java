package mju.paygo.comment.application;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.comment.domain.Comment;
import mju.paygo.comment.domain.CommentRepository;
import mju.paygo.comment.exception.exceptions.BoardNotFoundException;
import mju.paygo.comment.exception.exceptions.CommentNotFoundException;
import mju.paygo.comment.exception.exceptions.InvalidCommentOwnerException;
import mju.paygo.comment.exception.exceptions.MemberNotFoundException;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    public Comment createComment(final Long memberId, final Long boardId, final String content) {
        Member member = findMemberById(memberId);
        Board board = findBoardById(boardId);
        Comment comment = Comment.of(member, board, content);
        return commentRepository.save(comment);
    }

    public Comment updateComment(final Long memberId, final Long commentId, final String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(CommentNotFoundException::new);

        if (!comment.getMember().getId().equals(memberId)) {
            throw new InvalidCommentOwnerException();
        }

        comment.updateContent(content);
        return comment;
    }

    public void deleteComment(final Long memberId, final Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(CommentNotFoundException::new);

        if (!comment.getMember().getId().equals(memberId)) {
            throw new InvalidCommentOwnerException();
        }

        commentRepository.delete(comment);
    }

    public List<Comment> getCommentsByBoard(final Long boardId) {
        Board board = findBoardById(boardId);
        return commentRepository.findByBoard(board);
    }

    private Member findMemberById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
    }

    private Board findBoardById(final Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(BoardNotFoundException::new);
    }
}
