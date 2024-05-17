package mju.paygo.preferexercises.domain.vo;

import lombok.Getter;
import mju.paygo.preferexercises.exception.exceptions.ExerciseNotFoundException;

import java.util.Arrays;
import java.util.stream.Collectors;

@Getter
public enum Exercise {

    BENCH_PRESS("벤치프레스"),
    SQUAT("스쿼트"),
    DEADLIFT("데드리프트"),
    PULL_UP("풀업"),
    PUSH_UP("푸시업"),
    PLANCK("플랭크"),
    ARM_CURL("암컬"),
    LEG_CURL("레그컬"),
    DUMBBELL_PRESS("덤벨프레스"),
    BARBEL_ROW("바벨로우"),
    SIDE_LATERAL_RAISE("사이드레터럴레이즈"),
    FRONT_RAISE("프론트레이즈"),
    LEG_EXTENSION("레그익스텐션"),
    HEAP_RAISE("힙레이즈");

    private final String name;

    Exercise(final String name) {
        this.name = name;
    }

    public static Exercise findByName(final String name) {
        return Arrays.stream(values())
                .filter(exercise -> exercise.isSame(name))
                .findAny()
                .orElseThrow(ExerciseNotFoundException::new);
    }

    public static String collectAllNames() {
        return Arrays.stream(values())
                .map(Exercise::getName)
                .collect(Collectors.joining(", "));
    }

    public boolean isSame(final String name) {
        return name.equals(this.name);
    }
}
