package mju.paygo.water.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.water.domain.Water;
import mju.paygo.water.domain.WaterRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class WaterRepositoryImpl implements WaterRepository {

    private final WaterJpaRepository waterJpaRepository;

    @Override
    public Optional<Water> findByMemberIdAndToday(final Long memberId) {
        LocalDateTime start = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime end = LocalDateTime.now().toLocalDate().atTime(LocalTime.MAX);
        return waterJpaRepository.findByMemberIdAndToday(memberId, start, end);
    }

    @Override
    public Water save(final Water water) {
        return waterJpaRepository.save(water);
    }
}
