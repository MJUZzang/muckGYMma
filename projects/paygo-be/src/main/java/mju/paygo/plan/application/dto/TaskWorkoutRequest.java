package mju.paygo.plan.application.dto;

public record TaskWorkoutRequest(
        String name,
        Integer repeatation,
        Integer weight,
        Integer expect,
        Integer set,
        Integer time
) {
}
