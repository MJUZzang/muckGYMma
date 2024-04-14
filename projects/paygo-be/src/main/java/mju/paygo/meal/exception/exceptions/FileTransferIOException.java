package mju.paygo.meal.exception.exceptions;

public class FileTransferIOException extends RuntimeException {

    public FileTransferIOException() {
        super("파일 전송 과정에서 입출력 예외가 발생하였습니다.");
    }
}
