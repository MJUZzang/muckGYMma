package mju.paygo.plan.ui.dto;

import mju.paygo.plan.domain.Plan;
import mju.paygo.plan.domain.Task;

import java.time.LocalDateTime;

public record PlanOuterResponse(
        Long id,
        String name,
        Integer total,
        Integer time,
        Boolean cleared,
        LocalDateTime createdAt
) {

    public static PlanOuterResponse from(final Plan plan) {
        int total = plan.getTasks()
                .stream()
                .mapToInt(Task::getExpect)
                .sum();
        Integer time = plan.getTasks()
                .stream()
                .filter(task -> task.getTime() != null) // null 제외
                .mapToInt(Task::getTime)
                .sum();
        return new PlanOuterResponse(plan.getId(), plan.getName(), total, time, plan.getCleared(), plan.getCreatedAt());
    }
}
