package mju.paygo.board.infrastructure;

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

    private final BoardJpaRepository boardJpaRepository;

    @Override
    public List<Board> findAll() {
        return boardJpaRepository.findAll();
    }

    @Override
    public List<Board> findByMemberId(final Long memberId) {
        return boardJpaRepository.findByMemberId(memberId);
    }

    @Override
    public List<Board> findAllExceptMemberId(final Long memberId) {
        return boardJpaRepository.findAllByMemberIdNot(memberId);
    }

    @Override
    public Board save(final Board board) {
        return boardJpaRepository.save(board);
    }

    @Override
    public void delete(final Board board) {
        boardJpaRepository.delete(board);
    }

    @Override
    public Optional<Board> findById(final Long id) {
        return boardJpaRepository.findById(id);
    }

    @Override
    public void deleteById(final Long id) {
        boardJpaRepository.deleteById(id);
    }

    @Override
    public List<Board> findByMemberNickname(final String nickname) {
        return boardJpaRepository.findByMemberNickname(nickname);
    }

    @Override
    public long countByMember(final Member member) {
        return boardJpaRepository.countByMember(member);
    }

    @Override
    public Optional<Board> findByIdAndMemberId(final Long id, final Long memberId) {
        return boardJpaRepository.findByIdAndMemberId(id, memberId);
    }
}
