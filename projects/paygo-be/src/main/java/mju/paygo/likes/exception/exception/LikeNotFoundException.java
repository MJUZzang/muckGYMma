package mju.paygo.likes.exception.exception;

public class LikeNotFoundException extends RuntimeException {

    public LikeNotFoundException() {
        super("좋아요를 찾을 수 없습니다.");
    }
}
