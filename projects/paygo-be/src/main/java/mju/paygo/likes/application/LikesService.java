package mju.paygo.likes.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.likes.domain.Likes;
import mju.paygo.likes.domain.LikesRepository;
import mju.paygo.likes.exception.exception.BoardNotFoundException;
import mju.paygo.likes.exception.exception.LikeAlreadyExistsException;
import mju.paygo.likes.exception.exception.LikeNotFoundException;
import mju.paygo.likes.exception.exception.MemberNotFoundException;
import mju.paygo.likes.ui.dto.LikesResponse;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class LikesService {

    private final LikesRepository likesRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    public void like(final Long memberId, final Long boardId) {
        Member member = findMemberById(memberId);
        Board board = findBoardById(boardId);

        if (likesRepository.findByMemberAndBoard(member, board).isPresent()) {
            throw new LikeAlreadyExistsException();
        }

        Likes likes = Likes.of(member, board);
        likesRepository.save(likes);
    }

    public void unlike(final Long memberId, final Long boardId) {
        Member member = findMemberById(memberId);
        Board board = findBoardById(boardId);

        Likes like = likesRepository.findByMemberAndBoard(member, board)
                .orElseThrow(LikeNotFoundException::new);

        likesRepository.deleteByMemberAndBoard(member, board);
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

    public LikesResponse getLikesResponse(final Long boardId, final Long memberId) {
        long likeCount = countLikes(boardId);
        boolean isLikedByMember = hasLiked(memberId, boardId);

        Member member = findMemberById(memberId);
        return new LikesResponse(boardId, likeCount, isLikedByMember, member.getId(), member.getEmail(), member.getNickname());
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

