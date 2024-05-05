package mju.paygo.member.exception.exceptions.auth;

public class OAuthAccessException extends RuntimeException {

    public OAuthAccessException() {
        super("oauth 기관 접근 과정에서 예외가 발생했습니다.");
    }
}
