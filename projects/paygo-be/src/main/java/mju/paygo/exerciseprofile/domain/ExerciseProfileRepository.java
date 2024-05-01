package mju.paygo.exerciseprofile.domain;

public interface ExerciseProfileRepository {

    void save(final ExerciseProfile exerciseProfile);
    boolean existedByMemberId(final Long memberId);
}
