package mju.paygo.likes.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.likes.domain.Likes;
import mju.paygo.likes.domain.LikesRepository;
import mju.paygo.likes.ui.dto.LikesResponse;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class LikesService {

    private final LikesRepository likesRepository;
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

    public boolean like(final Long memberId, final Long boardId) {
        Member member = findMemberById(memberId);
        Board board = findBoardById(boardId);

        if (likesRepository.findByMemberAndBoard(member, board).isEmpty()) {
            Likes likes = Likes.of(member, board);
            likesRepository.save(likes);
            return true;
        }
        return false;
    }

    public boolean unlike(final Long memberId, final Long boardId) {
        Member member = findMemberById(memberId);
        Board board = findBoardById(boardId);

        Optional<Likes> likeOpt = likesRepository.findByMemberAndBoard(member, board);
        if (likeOpt.isPresent()) {
            likesRepository.deleteByMemberAndBoard(member, board);
            return true;
        }
        return false;
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
}