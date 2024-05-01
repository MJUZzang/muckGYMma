package mju.paygo.preferexercises.infrastructure;

import mju.paygo.preferexercises.domain.PreferExercises;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferExercisesJpaRepository extends JpaRepository<PreferExercises, Long> {

    PreferExercises save(final PreferExercises preferExercises);
}
