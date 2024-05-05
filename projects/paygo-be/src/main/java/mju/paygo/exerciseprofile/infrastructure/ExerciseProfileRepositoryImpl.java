package mju.paygo.exerciseprofile.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.exerciseprofile.domain.ExerciseProfile;
import mju.paygo.exerciseprofile.domain.ExerciseProfileRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class ExerciseProfileRepositoryImpl implements ExerciseProfileRepository {

    private final ExerciseProfileJpaRepository exerciseProfileJpaRepository;

    @Override
    public void save(final ExerciseProfile exerciseProfile) {
        exerciseProfileJpaRepository.save(exerciseProfile);
    }

    @Override
    public boolean existedByMemberId(final Long memberId) {
        return exerciseProfileJpaRepository.existsByMemberId(memberId);
    }

    @Override
    public Optional<ExerciseProfile> findByMemberId(final Long memberId) {
        return exerciseProfileJpaRepository.findByMemberId(memberId);
    }
}
