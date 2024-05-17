package mju.paygo.board.infrastructure;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.member.domain.member.Member;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class BoardRepositoryImpl implements BoardRepository {

    @PersistenceContext
    private final EntityManager entityManager;

    private final BoardJpaRepository boardJpaRepository;

    @Override
    public List<Board> findAll() {
        return boardJpaRepository.findAll();
    }

    @Override
    public List<Board> findByMemberId(Long memberId) {
        String jpql = "SELECT b FROM Board b WHERE b.member.id = :memberId";
        TypedQuery<Board> query = entityManager.createQuery(jpql, Board.class);
        query.setParameter("memberId", memberId);
        return query.getResultList();
    }

    @Override
    public List<Board> findAllExceptMemberId(final Long memberId) {
        String jpql = "SELECT b FROM Board b WHERE b.member.id <> :memberId";
        TypedQuery<Board> query = entityManager.createQuery(jpql, Board.class);
        query.setParameter("memberId", memberId);
        return query.getResultList();
    }

    @Override
    public Board save(final Board board) {
        return boardJpaRepository.save(board);
    }

    @Override
    public Optional<Board> findById(final Long id) {
        return boardJpaRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        boardJpaRepository.deleteById(id);
    }

    @Override
    public List<Board> findByMemberNickname(String nickname) {
        return boardJpaRepository.findByMemberNickname(nickname);
    }

    @Override
    public long countByMember(Member member) {
        return boardJpaRepository.countByMember(member);
    }
}
