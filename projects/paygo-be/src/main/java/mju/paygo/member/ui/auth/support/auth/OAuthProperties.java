package mju.paygo.member.ui.auth.support.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import mju.paygo.member.infrastructure.auth.dto.OAuthProviderRequest;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;

@Getter
@AllArgsConstructor
@ConfigurationProperties(prefix = "oauth2")
public class OAuthProperties {

    private final Map<OAuthPlatform, OAuthProviderRequest> properties;

    public OAuthProviderRequest findByProviderName(final String name) {
        return properties.get(OAuthPlatform.findPlatform(name));
    }
}
