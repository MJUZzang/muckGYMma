package mju.paygo.plan.exception.exceptions;

public class TaskTypeNotFoundException extends RuntimeException {

    public TaskTypeNotFoundException() {
        super("올바른 task 타입을 찾지 못했습니다.");
    }
}
