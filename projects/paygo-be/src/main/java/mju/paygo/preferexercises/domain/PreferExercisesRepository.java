package mju.paygo.preferexercises.domain;

import java.util.Optional;

public interface PreferExercisesRepository {

    void save(final PreferExercises preferExercises);
    boolean isExistByMemberId(final Long memberId);
    Optional<PreferExercises> findByMemberId(final Long memberId);
}
