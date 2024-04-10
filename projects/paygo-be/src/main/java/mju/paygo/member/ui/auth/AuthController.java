package mju.paygo.member.ui.auth;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.application.auth.AuthService;
import mju.paygo.member.application.auth.dto.LoginRequest;
import mju.paygo.member.infrastructure.auth.dto.OAuthProviderRequest;
import mju.paygo.member.ui.auth.dto.TokenResponse;
import mju.paygo.member.ui.auth.support.auth.OAuthAuthority;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.HEAD;
import static org.springframework.web.bind.annotation.RequestMethod.OPTIONS;
import static org.springframework.web.bind.annotation.RequestMethod.PATCH;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@CrossOrigin(
        origins = "https://muckgymma.kro.kr",
        methods = {GET, POST, OPTIONS, HEAD, PUT, PATCH, DELETE},
        allowCredentials = "true",
        maxAge = 3600,
        allowedHeaders = "*")
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
}
