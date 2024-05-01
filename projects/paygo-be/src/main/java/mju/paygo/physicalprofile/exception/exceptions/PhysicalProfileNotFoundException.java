package mju.paygo.physicalprofile.exception.exceptions;

public class PhysicalProfileNotFoundException extends RuntimeException {

    public PhysicalProfileNotFoundException() {
        super("회원의 신체 프로필 정보가 없습니다.");
    }
}
