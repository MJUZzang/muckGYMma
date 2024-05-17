package mju.paygo.comment.application;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.comment.domain.Comment;
import mju.paygo.comment.domain.CommentRepository;
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

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
    }

    private Board findBoardById(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Board not found"));
    }

    public Comment createComment(Long memberId, Long boardId, String content) {
        Member member = findMemberById(memberId);
        Board board = findBoardById(boardId);
        Comment comment = Comment.of(member, board, content);
        return commentRepository.save(comment);
    }

    public Comment updateComment(Long commentId, Long memberId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        if (!comment.getMember().getId().equals(memberId)) {
            throw new IllegalArgumentException("Member ID does not match the comment's owner");
        }
        comment.updateContent(content);
        return commentRepository.save(comment);
    }

    public void deleteComment(Long memberId, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        if (comment.getMember().getId().equals(memberId)) {
            commentRepository.deleteById(commentId);
        } else {
            throw new IllegalArgumentException("Member ID does not match the comment's owner");
        }
    }

    public List<Comment> getCommentsByBoard(Long boardId) {
        Board board = findBoardById(boardId);
        return commentRepository.findByBoard(board);
    }
}