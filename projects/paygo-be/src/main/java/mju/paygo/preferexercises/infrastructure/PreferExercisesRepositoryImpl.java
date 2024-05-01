package mju.paygo.preferexercises.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.preferexercises.domain.PreferExercises;
import mju.paygo.preferexercises.domain.PreferExercisesRepository;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class PreferExercisesRepositoryImpl implements PreferExercisesRepository {

    private final PreferExercisesJpaRepository preferExercisesJpaRepository;

    @Override
    public void save(final PreferExercises preferExercises) {
        preferExercisesJpaRepository.save(preferExercises);
    }

    @Override
    public boolean isExistByMemberId(final Long memberId) {
        return preferExercisesJpaRepository.existsByMemberId(memberId);
    }
}
