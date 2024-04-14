package mju.paygo.member.ui.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.application.auth.AuthService;
import mju.paygo.member.application.auth.dto.LoginRequest;
import mju.paygo.member.domain.auth.TokenProvider;
import mju.paygo.member.infrastructure.auth.dto.OAuthProviderRequest;
import mju.paygo.member.ui.auth.dto.TokenResponse;
import mju.paygo.member.ui.auth.support.auth.OAuthAuthority;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Optional;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class AuthController {

    private final AuthService authService;
    private final TokenProvider tokenProvider;

    @Value("${jwt.expiration-period}")
    private String expiration;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid final LoginRequest request,
                                               @OAuthAuthority final OAuthProviderRequest provider,
                                               final HttpServletResponse response) {
        String token = authService.login(request, provider);
        ResponseCookie cookie = generateCookieWithToken(token);
        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(new TokenResponse(token));
    }

    private ResponseCookie generateCookieWithToken(final String token) {
        return ResponseCookie.from("token", token)
                .sameSite("None")
                .path("/")
                .secure(true)
                .maxAge(Integer.parseInt(expiration))
                .httpOnly(true)
                .domain("muckgymma.kro.kr")
                .build();
    }

    @GetMapping("/login/check")
    public ResponseEntity<Void> checkTokenHealth(final HttpServletRequest request) {
        if (request.getCookies() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        Optional<Cookie> tokenCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("token"))
                .findAny();
        if (tokenCookie.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        Cookie cookie = tokenCookie.get();
        String token = cookie.getValue();
        tokenProvider.extract(token);

        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
