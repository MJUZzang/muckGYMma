package mju.paygo.physicalprofile.exception.exceptions;

public class GenderNotFoundException extends RuntimeException {

    public GenderNotFoundException() {
        super("성별을 찾을 수 없습니다.");
    }
}
