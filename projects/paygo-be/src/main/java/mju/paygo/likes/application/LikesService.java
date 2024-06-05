package mju.paygo.likes.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.likes.domain.Likes;
import mju.paygo.likes.domain.LikesRepository;
import mju.paygo.likes.exception.exception.BoardNotFoundException;
import mju.paygo.likes.exception.exception.MemberNotFoundException;
import mju.paygo.likes.ui.dto.LikesResponse;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class LikesService {

    private final LikesRepository likesRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    public LikesResponse toggleLike(final Long memberId, final Long boardId) {
        Member member = findMemberById(memberId);
        Board board = findBoardById(boardId);

        Optional<Likes> existingLike = likesRepository.findByMemberAndBoard(member, board);

        boolean isLiked;
        if (existingLike.isPresent()) {
            likesRepository.deleteByMemberAndBoard(member, board);
            isLiked = false; // 좋아요 취소
        } else {
            Likes likes = Likes.of(member, board);
            likesRepository.save(likes);
            isLiked = true; // 좋아요 추가
        }

        long likeCount = likesRepository.countByBoard(board);
        return new LikesResponse(isLiked, likeCount);
    }

    public long countLikes(final Long boardId) {
        Board board = findBoardById(boardId);
        return likesRepository.countByBoard(board);
    }

    public boolean hasLiked(final Long memberId, final Long boardId) {
        Member member = findMemberById(memberId);
        Board board = findBoardById(boardId);

        return likesRepository.findByMemberAndBoard(member, board).isPresent();
    }

    private Member findMemberById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
    }

    private Board findBoardById(final Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(BoardNotFoundException::new);
    }

    public List<Likes> findLikesByBoardId(Long boardId) {
        return likesRepository.findLikesByBoardId(boardId);
    }
}

