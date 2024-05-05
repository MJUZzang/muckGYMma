package mju.paygo.physicalprofile.domain.vo;

import mju.paygo.physicalprofile.exception.exceptions.GenderNotFoundException;

import java.util.Arrays;

public enum Gender {

    MALE("남성"),
    FEMALE("여성"),
    ETC("이 외");

    private final String name;

    Gender(final String name) {
        this.name = name;
    }

    public static Gender findByName(final String name) {
        return Arrays.stream(values())
                .filter(gender -> gender.isSame(name))
                .findAny()
                .orElseThrow(GenderNotFoundException::new);
    }

    public boolean isSame(final String name) {
        return name.equals(this.name);
    }
}
