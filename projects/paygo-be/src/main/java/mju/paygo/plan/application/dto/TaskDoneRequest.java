package mju.paygo.plan.application.dto;

import jakarta.validation.constraints.NotNull;

public record TaskDoneRequest(

        @NotNull(message = "완료한 시간이 필요합니다.")
        Integer time
) {
}
