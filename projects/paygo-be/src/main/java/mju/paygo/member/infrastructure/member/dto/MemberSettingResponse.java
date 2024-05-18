package mju.paygo.member.infrastructure.member.dto;

import lombok.Getter;
import mju.paygo.preferexercises.domain.vo.Exercise;
import mju.paygo.prefersports.domain.vo.Sports;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class MemberSettingResponse {

    String nickname;
    PhysicalSettingResponse physicalSetting;
    Set<String> sports;
    Set<String> exercises;
    ExerciseSettingResponse exerciseSetting;

    public MemberSettingResponse(
            final String nickname,
            final PhysicalSettingResponse physicalSetting,
            final Set<Sports> sports,
            final Set<Exercise> exercises,
            final ExerciseSettingResponse exerciseSetting) {
        this.nickname = nickname;
        this.physicalSetting = physicalSetting;
        this.sports = collectSports(sports);
        this.exercises = collectExercises(exercises);
        this.exerciseSetting = exerciseSetting;
    }

    private Set<String> collectSports(final Set<Sports> sports) {
        return sports.stream()
                .map(Sports::getName)
                .collect(Collectors.toSet());
    }

    private Set<String> collectExercises(final Set<Exercise> exercises) {
        return exercises.stream()
                .map(Exercise::getName)
                .collect(Collectors.toSet());
    }
}
