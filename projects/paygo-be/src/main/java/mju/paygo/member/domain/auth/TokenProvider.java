package mju.paygo.member.domain.auth;

public interface TokenProvider {

    String createTokenWith(final String email);

    String extract(final String token);
}
