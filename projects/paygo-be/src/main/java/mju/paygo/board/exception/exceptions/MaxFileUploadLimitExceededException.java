package mju.paygo.board.exception.exceptions;

public class MaxFileUploadLimitExceededException extends RuntimeException {

    public MaxFileUploadLimitExceededException() {
        super("최대 10개의 파일만 업로드할 수 있습니다.");
    }
}
