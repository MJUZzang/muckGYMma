package mju.paygo.member.application.auth;

import lombok.RequiredArgsConstructor;
import mju.paygo.global.event.Events;
import mju.paygo.member.application.auth.dto.LoginRequest;
import mju.paygo.member.application.auth.event.ValidatedLoginEvent;
import mju.paygo.member.domain.auth.TokenProvider;
import mju.paygo.member.infrastructure.auth.dto.MemberInfoResponse;
import mju.paygo.member.infrastructure.auth.dto.OAuthProviderRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final TokenProvider tokenProvider;
    private final OAuthRequester oAuthRequester;

    @Transactional
    public String login(final LoginRequest request, final OAuthProviderRequest provider) {
        String accessToken = oAuthRequester.getAccessToken(request.code(), provider);
        MemberInfoResponse memberInfoResponse = oAuthRequester.getMemberInfo(accessToken, provider);
        Events.raise(new ValidatedLoginEvent(memberInfoResponse.email(), memberInfoResponse.name()));

        return tokenProvider.createTokenWith(memberInfoResponse.email());
    }
}