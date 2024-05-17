package mju.paygo.follow.infrastructure;

import mju.paygo.follow.domain.Follow;
import mju.paygo.member.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowJpaRepository extends JpaRepository<Follow, Long> {
    List<Follow> findAllByFollower(Member follower);
    List<Follow> findAllByFollowee(Member followee);
    Optional<Follow> findByFollowerAndFollowee(Member follower, Member followee);
    long countByFollower(Member follower);
    long countByFollowee(Member followee);
}