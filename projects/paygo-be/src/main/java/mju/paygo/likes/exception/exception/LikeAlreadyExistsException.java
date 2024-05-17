package mju.paygo.likes.exception.exception;

public class LikeAlreadyExistsException extends RuntimeException {
    public LikeAlreadyExistsException() {
        super("이미 좋아요를 눌렀습니다.");
    }
}
