package mju.paygo.prefersports.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.prefersports.domain.PreferSports;
import mju.paygo.prefersports.domain.PreferSportsRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class PreferSportsRepositoryImpl implements PreferSportsRepository {

    private final PreferSportsJpaRepository preferSportsJpaRepository;

    @Override
    public void save(final PreferSports preferSports) {
        preferSportsJpaRepository.save(preferSports);
    }

    @Override
    public boolean isExistByMemberId(final Long memberId) {
        return preferSportsJpaRepository.existsByMemberId(memberId);
    }

    @Override
    public Optional<PreferSports> findByMemberId(final Long memberId) {
        return preferSportsJpaRepository.findByMemberId(memberId);
    }
}
