package mju.paygo.member.application.auth;

import lombok.RequiredArgsConstructor;
import mju.paygo.member.domain.auth.JsonMapper;
import mju.paygo.member.domain.auth.OAuthConnectionManager;
import mju.paygo.member.infrastructure.auth.dto.MemberInfoResponse;
import mju.paygo.member.infrastructure.auth.dto.OAuthProviderRequest;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OAuth2Requester implements OAuthRequester {

    private static final String KEY = "access_token";

    private final OAuthConnectionManager oAuthConnectionManager;
    private final JsonMapper jsonMapper;

    @Override
    public String getAccessToken(final String code, final OAuthProviderRequest provider) {
        String accessTokenResponse = oAuthConnectionManager.getAccessTokenResponse(provider, code);
        return jsonMapper.getValueByKey(accessTokenResponse, KEY);
    }

    @Override
    public MemberInfoResponse getMemberInfo(final String accessToken, final OAuthProviderRequest oAuthProviderRequest) {
        String memberInfoResponse = oAuthConnectionManager.getMemberInfoResponse(accessToken,
                oAuthProviderRequest.userInfoUri());

        return jsonMapper.extractMemberInfoFrom(memberInfoResponse, oAuthProviderRequest.memberInfoKeyWordRequest());
    }
}
