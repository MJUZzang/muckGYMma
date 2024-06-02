package mju.paygo.water.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.water.domain.Water;
import mju.paygo.water.domain.WaterRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class WaterRepositoryImpl implements WaterRepository {

    private final WaterJpaRepository waterJpaRepository;

    @Override
    public Optional<Water> findByMemberIdAndToday(final Long memberId) {
        ZonedDateTime start = getStartOfDayZoned();
        ZonedDateTime end = getEndOfDayZoned();
        return waterJpaRepository.findByMemberIdAndToday(memberId, start, end);
    }

    private ZonedDateTime getStartOfDayZoned() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        ZoneId zoneId = ZoneId.systemDefault();
        return startOfDay.atZone(zoneId);
    }

    private ZonedDateTime getEndOfDayZoned() {
        LocalDate today = LocalDate.now();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);
        ZoneId zoneId = ZoneId.systemDefault();
        return endOfDay.atZone(zoneId);
    }

    @Override
    public Water save(final Water water) {
        return waterJpaRepository.save(water);
    }
}
