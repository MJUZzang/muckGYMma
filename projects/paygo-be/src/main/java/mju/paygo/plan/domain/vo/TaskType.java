package mju.paygo.plan.domain.vo;

import mju.paygo.plan.exception.exceptions.TaskTypeNotFoundException;

import java.util.Arrays;

public enum TaskType {

    HEALTH("헬스"),
    SPORTS("스포츠");

    private final String name;

    TaskType(final String name) {
        this.name = name;
    }

    public static TaskType findByName(final String name) {
        return Arrays.stream(values())
                .filter(type -> type.isSame(name))
                .findAny()
                .orElseThrow(TaskTypeNotFoundException::new);
    }

    private boolean isSame(final String name) {
        return name.equals(this.name);
    }
}
