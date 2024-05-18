package mju.paygo.comment.exception.exceptions;

public class InvalidCommentOwnerException extends RuntimeException {

    public InvalidCommentOwnerException() {
        super("회원 ID가 댓글 작성자와 일치하지 않습니다.");
    }
}
