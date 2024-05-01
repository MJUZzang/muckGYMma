package mju.paygo.exerciseprofile.domain.dto;

public record ExerciseProfileEditRequest(
        String level,
        String goal,
        String experience,
        String frequency
) {
}
