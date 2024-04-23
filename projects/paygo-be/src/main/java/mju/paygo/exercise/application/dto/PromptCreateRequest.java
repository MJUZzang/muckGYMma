package mju.paygo.exercise.application.dto;

import jakarta.validation.constraints.NotBlank;

public record PromptCreateRequest(
        @NotBlank(message = "질의할 프롬프트 메시지가 반드시 필요합니다.")
        String message
) {
}
