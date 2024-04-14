package mju.paygo.member.exception.exceptions.auth;

public class OAuthPlatformNotFoundException extends RuntimeException {

    public OAuthPlatformNotFoundException() {
        super("소셜 로그인 기관을 찾을 수 없습니다.");
    }
}
