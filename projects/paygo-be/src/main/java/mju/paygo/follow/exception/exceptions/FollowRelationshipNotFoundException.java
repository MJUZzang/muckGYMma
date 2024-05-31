package mju.paygo.follow.exception.exceptions;

public class FollowRelationshipNotFoundException extends RuntimeException {

    public FollowRelationshipNotFoundException() {
        super("팔로우 관계를 찾을 수 없습니다.");
    }
}
