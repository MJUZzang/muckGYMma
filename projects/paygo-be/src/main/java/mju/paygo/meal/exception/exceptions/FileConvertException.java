package mju.paygo.meal.exception.exceptions;

public class FileConvertException extends RuntimeException {

    public FileConvertException() {
        super("파일 전환에 실패했습니다.");
    }
}
