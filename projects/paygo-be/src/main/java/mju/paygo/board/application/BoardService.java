package mju.paygo.board.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.BoardRepository;
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

    private BoardFindResponse toBoardFindResponse(Board board, Long memberId) {
        return new BoardFindResponse(
                board.getId(),
                board.getContent(),
                board.getImageUrl(),
                board.getMember().getId(),
                board.getMember().getNickname(),
                likesService.countLikes(board.getId()),
                likesService.hasLiked(memberId, board.getId()),
                commentRepository.countByBoard(board) // 댓글 수 포함
        );
    }

    public List<BoardFindResponse> findByMemberId(Long memberId) {
        return boardRepository.findByMemberId(memberId).stream()
                .map(board -> toBoardFindResponse(board, memberId))
                .collect(Collectors.toList());
    }

    public void updateBoard(Long boardId, Long memberId, String content) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalBoard.isPresent()) {
            Board board = optionalBoard.get();
            if (board.getMember().getId().equals(memberId)) {
                board.updateContent(content);
                boardRepository.save(board);
            } else {
                throw new IllegalArgumentException("Member ID does not match the board's owner");
            }
        } else {
            throw new IllegalArgumentException("Board not found");
        }
    }

    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    public List<BoardFindResponse> findAllByNickname(String nickname) {
        return boardRepository.findByMemberNickname(nickname).stream()
                .map(board -> toBoardFindResponse(board, board.getMember().getId()))
                .collect(Collectors.toList());
    }

    public List<BoardFindResponse> findAllExceptMemberId(Long memberId) {
        return boardRepository.findAllExceptMemberId(memberId).stream()
                .map(board -> toBoardFindResponse(board, memberId))
                .collect(Collectors.toList());
    }


    public List<BoardFindResponse> findAllExceptNickname(String nickname) {
        return boardRepository.findAll().stream()
                .filter(board -> !board.getMember().getNickname().equals(nickname))
                .map(board -> toBoardFindResponse(board, board.getMember().getId()))
                .collect(Collectors.toList());
    }

    public Optional<Board> findById(Long boardId) {
        return boardRepository.findById(boardId);
    }

    public Board save(Board board) {
        return boardRepository.save(board);
    }
}