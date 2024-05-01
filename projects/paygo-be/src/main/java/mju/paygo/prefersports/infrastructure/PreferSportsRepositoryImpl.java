package mju.paygo.prefersports.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.prefersports.domain.PreferSports;
import mju.paygo.prefersports.domain.PreferSportsRepository;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class PreferSportsRepositoryImpl implements PreferSportsRepository {

    private final PreferSportsJpaRepository preferSportsJpaRepository;

    @Override
    public void save(final PreferSports preferSports) {
        preferSportsJpaRepository.save(preferSports);
    }
}
