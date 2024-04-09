package mju.paygo.member.ui.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.application.auth.AuthService;
import mju.paygo.member.application.auth.dto.LoginRequest;
import mju.paygo.member.infrastructure.auth.dto.OAuthProviderRequest;
import mju.paygo.member.ui.auth.dto.TokenResponse;
import mju.paygo.member.ui.auth.support.auth.OAuthAuthority;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "https://muckgymma.kro.kr", allowedHeaders = {"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"})
@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class AuthController {

    private final AuthService authService;

    @Value("${jwt.expiration-period}")
    private String expiration;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid final LoginRequest request,
                                               @OAuthAuthority final OAuthProviderRequest provider,
                                               final HttpServletResponse response) {
        String token = authService.login(request, provider);
        response.addCookie(generateCookieWithToken(token));

        return ResponseEntity.ok(new TokenResponse(token));
    }

    private Cookie generateCookieWithToken(final String token) {
        Cookie cookie = new Cookie("token", token);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setMaxAge(Integer.parseInt(expiration));
        cookie.setHttpOnly(true);
        cookie.setDomain("muckgymma.kro.kr");

        return cookie;
    }
}
