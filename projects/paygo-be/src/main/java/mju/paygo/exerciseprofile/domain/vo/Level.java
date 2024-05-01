package mju.paygo.exerciseprofile.domain.vo;

import mju.paygo.exerciseprofile.exception.exceptions.LevelNotFoundException;

import java.util.Arrays;

public enum Level {

    NEWBIE("입문자"),
    LOW_LEVEL("초보자"),
    MEDIUM_LEVEL("중급자"),
    EXPERT("전문가");

    private final String name;

    Level(final String name) {
        this.name = name;
    }

    public static Level findByName(final String name) {
        return Arrays.stream(values())
                .filter(level -> level.isSame(name))
                .findAny()
                .orElseThrow(LevelNotFoundException::new);
    }

    public boolean isSame(final String name) {
        return name.equals(this.name);
    }
}
