package mju.paygo.follow.domain;

import mju.paygo.member.domain.member.Member;

import java.util.List;
import java.util.Optional;

public interface FollowRepository {
    Follow save(Follow follow);
    Optional<Follow> findById(Long id);
    void deleteById(Long id);
    List<Follow> findAllByFollower(Member follower);
    List<Follow> findAllByFollowee(Member followee);
    Optional<Follow> findByFollowerAndFollowee(Member follower, Member followee);
    long countByFollower(Member follower);
    long countByFollowee(Member followee);
}