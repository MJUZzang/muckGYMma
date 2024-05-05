package mju.paygo.member.ui.member.dto;

import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileEditRequest;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileEditRequest;

import java.util.List;

public record MemberEditRequest(
        PhysicalProfileEditRequest physicalSetting,
        List<String> sports,
        List<String> exercises,
        ExerciseProfileEditRequest exerciseSetting
) {
}
