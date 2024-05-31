package mju.paygo.plan.exception.exceptions;

public class PlanNotFoundException extends RuntimeException {

    public PlanNotFoundException() {
        super("회원과 task에 맞는 Plan이 없습니다.");
    }
}
