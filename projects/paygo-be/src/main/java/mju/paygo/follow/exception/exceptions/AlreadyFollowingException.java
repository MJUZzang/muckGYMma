package mju.paygo.follow.exception.exceptions;

public class AlreadyFollowingException extends RuntimeException {
    public AlreadyFollowingException() {
        super("이미 팔로우 중인 회원입니다.");
    }
}
