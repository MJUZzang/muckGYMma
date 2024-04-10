package mju.paygo.member.ui.auth.support.resolver;

import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.domain.auth.JsonMapper;
import mju.paygo.member.ui.auth.support.auth.OAuthAuthority;
import mju.paygo.member.ui.auth.support.auth.OAuthProperties;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@RequiredArgsConstructor
@Component
public class OAuthArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String KEY = "provider";

    private final OAuthProperties oAuthProperties;
    private final JsonMapper jsonMapper;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(OAuthAuthority.class);
    }

    @Override
    public Object resolveArgument(final MethodParameter parameter,
                                  final ModelAndViewContainer mavContainer,
                                  final NativeWebRequest webRequest,
                                  final WebDataBinderFactory binderFactory) throws IOException {

        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        ServletInputStream inputStream = Objects.requireNonNull(request).getInputStream();
        String requestBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
        String provider = jsonMapper.getValueByKey(requestBody, KEY);

        return oAuthProperties.findByProviderName(provider);
    }
}

