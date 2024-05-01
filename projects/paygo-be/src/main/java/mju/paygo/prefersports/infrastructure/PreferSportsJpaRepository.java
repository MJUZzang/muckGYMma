package mju.paygo.prefersports.infrastructure;

import mju.paygo.prefersports.domain.PreferSports;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferSportsJpaRepository extends JpaRepository<PreferSports, Long> {

    PreferSports save(final PreferSports preferSports);
    boolean existsByMemberId(final Long memberId);
}
