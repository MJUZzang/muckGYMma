package mju.paygo.follow.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.follow.domain.Follow;
import mju.paygo.follow.domain.FollowRepository;
import mju.paygo.member.domain.member.Member;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class FollowRepositoryImpl implements FollowRepository {

    private final FollowJpaRepository followJpaRepository;

    @Override
    public Follow save(Follow follow) {
        return followJpaRepository.save(follow);
    }

    @Override
    public Optional<Follow> findById(Long id) {
        return followJpaRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        followJpaRepository.deleteById(id);
    }

    @Override
    public List<Follow> findAllByFollower(Member follower) {
        return followJpaRepository.findAllByFollower(follower);
    }

    @Override
    public List<Follow> findAllByFollowee(Member followee) {
        return followJpaRepository.findAllByFollowee(followee);
    }

    @Override
    public Optional<Follow> findByFollowerAndFollowee(Member follower, Member followee) {
        return followJpaRepository.findByFollowerAndFollowee(follower, followee);
    }

    @Override
    public long countByFollower(Member follower) {
        return followJpaRepository.countByFollower(follower);
    }

    @Override
    public long countByFollowee(Member followee) {
        return followJpaRepository.countByFollowee(followee);
    }
}