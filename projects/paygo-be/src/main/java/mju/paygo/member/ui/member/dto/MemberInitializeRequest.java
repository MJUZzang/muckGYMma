package mju.paygo.member.ui.member.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileCreateRequest;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileCreateRequest;

import java.util.List;

public record MemberInitializeRequest(

        @Valid
        PhysicalProfileCreateRequest physicalSetting,

        @NotNull(message = "선호하는 스포츠가 필요합니다.")
        List<String> sports,

        @NotNull(message = "선호하는 운동이 필요합니다.")
        List<String> exercises,

        @Valid
        ExerciseProfileCreateRequest exerciseSetting
) {
}
