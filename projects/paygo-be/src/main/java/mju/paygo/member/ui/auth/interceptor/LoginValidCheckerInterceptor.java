package mju.paygo.member.ui.auth.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.domain.auth.TokenProvider;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.member.exception.exceptions.auth.LoginInvalidException;
import mju.paygo.member.ui.auth.support.auth.AuthenticationContext;
import mju.paygo.member.ui.auth.support.auth.AuthenticationExtractor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@RequiredArgsConstructor
@Component
public class LoginValidCheckerInterceptor implements HandlerInterceptor {

    private final TokenProvider tokenProvider;
    private final AuthenticationContext authenticationContext;
    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(final HttpServletRequest request,
                             final HttpServletResponse response,
                             final Object handler) throws Exception {
        String token = AuthenticationExtractor.extract(request)
                .orElseThrow(LoginInvalidException::new);

        String memberEmail = tokenProvider.extract(token);
        Member findMember = memberRepository.findByEmail(memberEmail)
                .orElseThrow(RuntimeException::new);
        authenticationContext.setAuthentication(findMember.getId());

        return true;
    }
}
