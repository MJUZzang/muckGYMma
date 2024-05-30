package mju.paygo.plan.ui.dto;

import mju.paygo.plan.domain.Task;

import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String name,
        Boolean cleared,
        Integer weight,
        Integer sets,
        Integer repeatation,
        Integer kcal,
        Integer time,
        Integer doneSecond,
        LocalDateTime clearedAt
) {

    public static TaskResponse from(final Task task) {
        return new TaskResponse(
                task.getId(),
                task.getName(),
                task.getCleared(),
                task.getWeight(),
                task.getSets(),
                task.getRepeatation(),
                task.getExpect(),
                task.getTime(),
                task.getDoneSecond(),
                task.getClearedAt()
        );
    }
}
