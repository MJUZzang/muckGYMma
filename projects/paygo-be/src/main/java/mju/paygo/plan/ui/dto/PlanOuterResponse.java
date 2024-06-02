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
        int time = 0;
        for (Task task : plan.getTasks()) {
            if (task.getTime() == null) {
                continue;
            }
            if (task.getSets() == null) {
                time += task.getTime();
            } else {
                time += task.getTime() * task.getSets();
            }
        }
        return new PlanOuterResponse(plan.getId(), plan.getName(), total, time, plan.getCleared(), plan.getCreatedAt());
    }
}
