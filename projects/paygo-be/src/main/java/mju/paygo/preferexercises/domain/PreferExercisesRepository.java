package mju.paygo.preferexercises.domain;

public interface PreferExercisesRepository {

    void save(final PreferExercises preferExercises);
    boolean isExistByMemberId(final Long memberId);
}
