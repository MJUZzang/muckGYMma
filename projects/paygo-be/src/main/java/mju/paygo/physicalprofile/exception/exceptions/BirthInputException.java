package mju.paygo.physicalprofile.exception.exceptions;

public class BirthInputException extends RuntimeException {

    public BirthInputException() {
        super("생년월일 형식이 올바르지 않습니다.");
    }
}
