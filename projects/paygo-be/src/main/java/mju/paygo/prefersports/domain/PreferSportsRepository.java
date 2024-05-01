package mju.paygo.prefersports.domain;

import java.util.Optional;

public interface PreferSportsRepository {

    void save(final PreferSports preferSports);
    boolean isExistByMemberId(final Long memberId);
    Optional<PreferSports> findByMemberId(final Long memberId);
}
