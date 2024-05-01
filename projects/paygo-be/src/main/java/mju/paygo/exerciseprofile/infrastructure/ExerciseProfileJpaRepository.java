package mju.paygo.exerciseprofile.infrastructure;

import mju.paygo.exerciseprofile.domain.ExerciseProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExerciseProfileJpaRepository extends JpaRepository<ExerciseProfile, Long> {

    ExerciseProfile save(final ExerciseProfile exerciseProfile);
    boolean existsByMemberId(final Long memberId);
    Optional<ExerciseProfile> findByMemberId(final Long memberId);
}
