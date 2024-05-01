package mju.paygo.exerciseprofile.domain;

import java.util.Optional;

public interface ExerciseProfileRepository {

    void save(final ExerciseProfile exerciseProfile);
    boolean existedByMemberId(final Long memberId);
    Optional<ExerciseProfile> findByMemberId(final Long memberId);
}
