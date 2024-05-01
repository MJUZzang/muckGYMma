package mju.paygo.preferexercises.infrastructure;

import mju.paygo.preferexercises.domain.PreferExercises;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PreferExercisesJpaRepository extends JpaRepository<PreferExercises, Long> {

    PreferExercises save(final PreferExercises preferExercises);
    boolean existsByMemberId(final Long memberId);
    Optional<PreferExercises> findByMemberId(final Long memberId);
}
