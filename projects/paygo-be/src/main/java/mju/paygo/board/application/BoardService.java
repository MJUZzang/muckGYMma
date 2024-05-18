package mju.paygo.board.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.board.exception.exceptions.BoardNotFoundException;
import mju.paygo.board.exception.exceptions.InvalidMemberException;
import mju.paygo.board.ui.dto.BoardFindResponse;
import mju.paygo.comment.domain.CommentRepository;
import mju.paygo.likes.application.LikesService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final LikesService likesService;
    private final CommentRepository commentRepository;

    public List<BoardFindResponse> findByMemberId(final Long memberId) {
        return boardRepository.findByMemberId(memberId).stream()
                .map(board -> toBoardFindResponse(board, memberId))
                .collect(Collectors.toList());
    }

    public void updateBoard(final Long boardId, final Long memberId, final String content) {
        Board board = boardRepository.findByIdAndMemberId(boardId, memberId)
                .orElseThrow(BoardNotFoundException::new);

        if (!board.getMember().getId().equals(memberId)) {
            throw new InvalidMemberException();
        }
        board.updateContent(content);
    }

    public void deleteBoard(final Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(BoardNotFoundException::new);
        boardRepository.delete(board);
    }

    public List<BoardFindResponse> findAllByNickname(final String nickname) {
        return boardRepository.findByMemberNickname(nickname).stream()
                .map(board -> toBoardFindResponse(board, board.getMember().getId()))
                .collect(Collectors.toList());
    }

    public List<BoardFindResponse> findAllExceptMemberId(final Long memberId) {
        return boardRepository.findAllExceptMemberId(memberId).stream()
                .map(board -> toBoardFindResponse(board, memberId))
                .collect(Collectors.toList());
    }

    public List<BoardFindResponse> findAllExceptNickname(final String nickname) {
        return boardRepository.findAll().stream()
                .filter(board -> !board.getMember().getNickname().equals(nickname))
                .map(board -> toBoardFindResponse(board, board.getMember().getId()))
                .collect(Collectors.toList());
    }

    public Optional<Board> findById(final Long boardId) {
        return boardRepository.findById(boardId);
    }

    public Board save(final Board board) {
        return boardRepository.save(board);
    }

    private BoardFindResponse toBoardFindResponse(final Board board, final Long memberId) {
        return new BoardFindResponse(
                board.getId(),
                board.getContent(),
                board.getImageUrl(),
                board.getMember().getId(),
                board.getMember().getNickname(),
                likesService.countLikes(board.getId()),
                likesService.hasLiked(memberId, board.getId()),
                commentRepository.countByBoard(board)
        );
    }
}
