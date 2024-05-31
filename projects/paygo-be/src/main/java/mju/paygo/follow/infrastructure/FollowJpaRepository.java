package mju.paygo.follow.infrastructure;

import mju.paygo.follow.domain.Follow;
import mju.paygo.member.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowJpaRepository extends JpaRepository<Follow, Long> {
    boolean existsByFollowerAndFollowee(final Member follower, final Member followee);
    void deleteByFollowerAndFollowee(final Member follower, final Member followee);
    List<Follow> findAllByFollower(final Member follower);
    List<Follow> findAllByFollowee(final Member followee);
    Optional<Follow> findByFollowerAndFollowee(final Member follower, final Member followee);
    long countByFollower(final Member follower);
    long countByFollowee(final Member followee);
}
