package mju.paygo.follow.domain;

import mju.paygo.member.domain.member.Member;

import java.util.List;
import java.util.Optional;

public interface FollowRepository {
    boolean existsByFollowerAndFollowee(final Member follower, final Member followee);
    Follow save(final Follow follow);
    void deleteByFollowerAndFollowee(final Member follower, final Member followee);
    Optional<Follow> findById(final Long id);
    void deleteById(final Long id);
    List<Follow> findAllByFollower(final Member follower);
    List<Follow> findAllByFollowee(final Member followee);
    Optional<Follow> findByFollowerAndFollowee(final Member follower, final Member followee);
    long countByFollower(final Member follower);
    long countByFollowee(final Member followee);

    boolean existsByFollowerAndFolloweeId(Long memberId, Long id);
}
