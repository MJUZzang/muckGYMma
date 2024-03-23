package mju.paygo.member.infrastructure.auth.dto;

public record OAuthProviderRequest(
        String clientId,
        String clientSecret,
        String redirectUri,
        String tokenUri,
        String userInfoUri,
        MemberInfoKeyWordRequest memberInfoKeyWordRequest
) {
}
