package mju.paygo.plan.exception.exceptions;

public class PlanAlreadyExistedException extends RuntimeException {

    public PlanAlreadyExistedException() {
        super("이미 회원과 음식에 대한 플랜이 있습니다.");
    }
}
