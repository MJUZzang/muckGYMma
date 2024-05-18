package mju.paygo.likes.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.likes.domain.Likes;
import mju.paygo.likes.domain.LikesRepository;
import mju.paygo.member.domain.member.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class LikesRepositoryImpl implements LikesRepository {

    @Autowired
    private LikesJpaRepository likesJpaRepository;

    @Override
    public Optional<Likes> findByMemberAndBoard(final Member member, final Board board) {
        return likesJpaRepository.findByMemberAndBoard(member, board);
    }

    @Override
    public void deleteByMemberAndBoard(final Member member, final Board board) {
        likesJpaRepository.deleteByMemberAndBoard(member, board);
    }

    @Override
    public long countByBoard(final Board board) {
        return likesJpaRepository.countByBoard(board);
    }

    @Override
    public Likes save(final Likes likes) {
        return likesJpaRepository.save(likes);
    }
}
