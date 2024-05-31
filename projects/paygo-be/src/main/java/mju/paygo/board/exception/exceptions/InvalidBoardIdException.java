package mju.paygo.board.exception.exceptions;

public class InvalidBoardIdException extends RuntimeException {

    public InvalidBoardIdException() {
        super("유효하지 않은 게시글 ID입니다.");
    }
}
