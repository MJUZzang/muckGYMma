package mju.paygo.prefersports.infrastructure;

import mju.paygo.prefersports.domain.PreferSports;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PreferSportsJpaRepository extends JpaRepository<PreferSports, Long> {

    PreferSports save(final PreferSports preferSports);
    boolean existsByMemberId(final Long memberId);
    Optional<PreferSports> findByMemberId(final Long memberId);
}
