package mju.paygo.member.infrastructure.auth.dto;

public record MemberInfoKeyWordRequest(
        String emailKeyWord,
        String nicknameKeyWord
) {
}
