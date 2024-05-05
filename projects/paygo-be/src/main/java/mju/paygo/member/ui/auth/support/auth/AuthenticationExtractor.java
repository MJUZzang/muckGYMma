package mju.paygo.member.ui.auth.support.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import mju.paygo.member.exception.exceptions.auth.LoginInvalidException;

import java.util.Arrays;
import java.util.Optional;

public class AuthenticationExtractor {

    public static Optional<String> extract(final HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            throw new LoginInvalidException();
        }
        Cookie tokenCookie = Arrays.stream(cookies).filter(cookie -> cookie.getName().equals("token"))
                .findAny()
                .orElseThrow(LoginInvalidException::new);

        return Optional.of(tokenCookie.getValue());
    }
}
