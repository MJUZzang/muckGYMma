package mju.paygo.likes.domain;

import mju.paygo.board.domain.Board;
import mju.paygo.member.domain.member.Member;

import java.util.Optional;

public interface LikesRepository {
    Optional<Likes> findByMemberAndBoard(final Member member, final Board board);
    void deleteByMemberAndBoard(final Member member, final Board board);
    long countByBoard(final Board board);
    Likes save(final Likes likes);
}
