package mju.paygo.plan.application.dto;

import java.util.List;

public record PlanCreateRequest(
        String type,
        List<TaskWorkoutRequest> workouts
) {
}
