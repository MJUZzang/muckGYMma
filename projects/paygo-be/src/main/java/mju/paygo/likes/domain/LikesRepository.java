package mju.paygo.likes.domain;

import mju.paygo.board.domain.Board;
import mju.paygo.member.domain.member.Member;

import java.util.Optional;

public interface LikesRepository {
    Optional<Likes> findByMemberAndBoard(Member member, Board board);
    void deleteByMemberAndBoard(Member member, Board board);
    long countByBoard(Board board);
    Likes save(Likes likes);
}
