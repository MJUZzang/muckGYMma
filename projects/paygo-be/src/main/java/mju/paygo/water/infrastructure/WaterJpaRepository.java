package mju.paygo.water.infrastructure;

import mju.paygo.water.domain.Water;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface WaterJpaRepository extends JpaRepository<Water, Long> {

    @Query("select w from Water w where w.memberId =:memberId and w.createdAt between :start and :end")
    Optional<Water> findByMemberIdAndToday(Long memberId, LocalDateTime start, LocalDateTime end);
}
