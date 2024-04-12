package mju.paygo.food.exception.exceptions;

public class FileExtensionExtractException extends RuntimeException {

    public FileExtensionExtractException() {
        super("파일 확장자 추출을 하지 못했습니다.");
    }
}
