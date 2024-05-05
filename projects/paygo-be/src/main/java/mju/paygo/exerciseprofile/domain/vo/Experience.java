package mju.paygo.exerciseprofile.domain.vo;

import mju.paygo.exerciseprofile.exception.exceptions.ExperienceNotFoundException;

import java.util.Arrays;

public enum Experience {

    FIRST("처음"),
    THREE_MONTH_UNDER("3개월 미만"),
    SIX_MONTH_UNDER("6개월 미만"),
    ONE_YEAR_UNDER("1년 미만"),
    OVER_ONE_YEAR("1년 이상");

    private final String name;

    Experience(final String name) {
        this.name = name;
    }

    public static Experience findByName(final String name) {
        return Arrays.stream(values())
                .filter(experience -> experience.isSame(name))
                .findAny()
                .orElseThrow(ExperienceNotFoundException::new);
    }

    public boolean isSame(final String name) {
        return name.equals(this.name);
    }
}
