package mju.paygo.member.application.auth;

import mju.paygo.member.infrastructure.auth.dto.MemberInfoResponse;
import mju.paygo.member.infrastructure.auth.dto.OAuthProviderRequest;

public interface OAuthRequester {

    String getAccessToken(final String code, final OAuthProviderRequest provider);

    MemberInfoResponse getMemberInfo(final String accessToken, final OAuthProviderRequest oAuthProviderRequest);
}
