package mju.paygo.board.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.application.event.BoardCreatedEvent;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.board.exception.exceptions.BoardNotFoundException;
import mju.paygo.board.exception.exceptions.InvalidMemberException;
import mju.paygo.board.exception.exceptions.MealNotFoundException;
import mju.paygo.board.ui.dto.BoardFindResponse;
import mju.paygo.comment.domain.CommentRepository;
import mju.paygo.likes.application.LikesService;
import mju.paygo.meal.domain.Meal;
import mju.paygo.meal.domain.MealRepository;
import mju.paygo.member.domain.member.Member;
import org.springframework.context.ApplicationEventPublisher;
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
    private final MealRepository mealRepository;
    private final ApplicationEventPublisher eventPublisher;

    public Board saveBoardWithMeal(Member member, Long mealId, String content) {
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(MealNotFoundException::new);

        Board board = new Board(member, meal.getImageUrl(), content, false);
        boardRepository.save(board);

        eventPublisher.publishEvent(new BoardCreatedEvent(mealId));
        return board;
    }

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
        Meal meal = mealRepository.findByImageUrl(board.getImageUrl())
                .orElseThrow(MealNotFoundException::new);
        return new BoardFindResponse(
                board.getId(),
                board.getContent(),
                board.getImageUrl(),
                board.getMember().getId(),
                board.getMember().getNickname(),
                likesService.countLikes(board.getId()),
                likesService.hasLiked(memberId, board.getId()),
                commentRepository.countByBoard(board),
                meal.getNutrient().getKcal()
        );
    }
}
