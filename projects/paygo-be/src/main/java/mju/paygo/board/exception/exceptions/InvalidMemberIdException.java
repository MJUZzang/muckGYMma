package mju.paygo.board.exception.exceptions;

public class InvalidMemberIdException extends RuntimeException {

    public InvalidMemberIdException() {
        super("유효하지 않은 회원 ID입니다.");
    }
}
