package mju.paygo.plan.ui.dto;

import mju.paygo.plan.domain.Plan;
import mju.paygo.plan.domain.Task;

import java.time.LocalDateTime;
import java.util.List;

public record PlanInnerResponse(
        String name,
        Integer total,
        List<TaskResponse> tasks,
        LocalDateTime clearedAt
) {

    public static PlanInnerResponse from(final Plan plan) {
        List<Task> tasks = plan.getTasks();
        List<TaskResponse> list = tasks.stream()
                .map(TaskResponse::from)
                .toList();
        int total = tasks.stream()
                .mapToInt(Task::getExpect)
                .sum();
        return new PlanInnerResponse(plan.getName(), total, list, plan.getClearedAt());
    }
}
