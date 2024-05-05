package mju.paygo.member.ui.auth.support.auth;

import mju.paygo.member.exception.exceptions.auth.OAuthPlatformNotFoundException;

import java.util.Arrays;

public enum OAuthPlatform {

    KAKAO("KAKAO"),
    GOOGLE("GOOGLE");

    private final String name;

    OAuthPlatform(final String name) {
        this.name = name;
    }

    public static OAuthPlatform findPlatform(final String name) {

        return Arrays.stream(values())
                .filter(platform -> name.equals(platform.name))
                .findFirst()
                .orElseThrow(OAuthPlatformNotFoundException::new);
    }
}
