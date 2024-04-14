package mju.paygo.member.ui.auth.support.resolver;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.domain.auth.TokenProvider;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.member.exception.exceptions.auth.LoginInvalidException;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import mju.paygo.member.ui.auth.support.auth.AuthenticationExtractor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.Objects;

@RequiredArgsConstructor
@Component
public class AuthArgumentResolver implements HandlerMethodArgumentResolver {

    private static final int ANONYMOUS = -1;

    private final MemberRepository memberRepository;

    private final TokenProvider tokenProvider;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthMember.class) &&
                parameter.getParameterType().equals(Long.class);
    }

    @Override
    public Object resolveArgument(final MethodParameter parameter,
                                  final ModelAndViewContainer mavContainer,
                                  final NativeWebRequest webRequest,
                                  final WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        String token = AuthenticationExtractor.extract(Objects.requireNonNull(request))
                .orElseThrow(LoginInvalidException::new);
        String email = tokenProvider.extract(token);
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(LoginInvalidException::new);

        return member.getId();
    }
}
