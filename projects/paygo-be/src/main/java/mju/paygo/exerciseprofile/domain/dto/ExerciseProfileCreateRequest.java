package mju.paygo.exerciseprofile.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record ExerciseProfileCreateRequest(
        @NotBlank(message = "운동 레벨을 입력해주세요.")
        String level,

        @NotBlank(message = "운동 목표를 입력해주세요.")
        String goal,

        @NotBlank(message = "운동 경험을 입력해주세요.")
        String experience,

        @NotBlank(message = "운동 빈도를 입력해주세요.")
        String frequency
) {
}
