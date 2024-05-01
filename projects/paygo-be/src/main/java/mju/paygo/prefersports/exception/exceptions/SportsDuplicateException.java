package mju.paygo.prefersports.exception.exceptions;

public class SportsDuplicateException extends RuntimeException {

    public SportsDuplicateException() {
        super("각 스포츠는 한 번만 등록될 수 있습니다.");
    }
}
