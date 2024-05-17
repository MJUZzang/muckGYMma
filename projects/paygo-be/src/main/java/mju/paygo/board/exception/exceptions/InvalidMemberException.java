package mju.paygo.board.exception.exceptions;

public class InvalidMemberException extends RuntimeException {

    public InvalidMemberException() {
        super("회원 ID가 게시글의 소유자와 일치하지 않습니다.");
    }
}
