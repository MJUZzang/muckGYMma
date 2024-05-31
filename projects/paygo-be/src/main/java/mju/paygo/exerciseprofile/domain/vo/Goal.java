package mju.paygo.exerciseprofile.domain.vo;

import lombok.Getter;
import mju.paygo.exerciseprofile.exception.exceptions.GoalNotFoundException;

import java.util.Arrays;

@Getter
public enum Goal {

    INCREASE_MUSCLE("근비대"),
    MAINTAIN("유지"),
    DIET("체중 감량");

    private final String name;

    Goal(final String name) {
        this.name = name;
    }

    public static Goal findByName(final String name) {
        return Arrays.stream(values())
                .filter(goal -> goal.isSame(name))
                .findAny()
                .orElseThrow(GoalNotFoundException::new);
    }

    public boolean isSame(final String name) {
        return name.equals(this.name);
    }
}
