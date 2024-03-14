package mju.paygo.member.config;

import lombok.RequiredArgsConstructor;
import mju.paygo.member.ui.auth.support.resolver.OAuthArgumentResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class OAuthConfig implements WebMvcConfigurer {

    private final OAuthArgumentResolver oAuthArgumentResolver;

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(oAuthArgumentResolver);
    }
}
