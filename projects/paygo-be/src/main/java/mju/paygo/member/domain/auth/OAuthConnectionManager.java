package mju.paygo.member.domain.auth;

import mju.paygo.member.infrastructure.auth.dto.OAuthProviderRequest;

public interface OAuthConnectionManager {

    String getAccessTokenResponse (final OAuthProviderRequest oAuthProviderRequest, final String code);

    String getMemberInfoResponse(final String accessToken, final String userInfoUrl);
}
