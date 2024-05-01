package mju.paygo.exerciseprofile.domain.vo;

import mju.paygo.exerciseprofile.exception.exceptions.FrequencyNotFoundException;

import java.util.Arrays;

public enum Frequency {

    ONE("주 1회"),
    TWO("주 2회"),
    THREE("주 3회"),
    FOUR("주 4회"),
    FIVE("주 5회"),
    EVERYDAY("매일");

    private final String name;

    Frequency(final String name) {
        this.name = name;
    }

    public static Frequency findByName(final String name) {
        return Arrays.stream(values())
                .filter(frequency -> frequency.isSame(name))
                .findAny()
                .orElseThrow(FrequencyNotFoundException::new);
    }

    public boolean isSame(final String name) {
        return name.equals(this.name);
    }
}
