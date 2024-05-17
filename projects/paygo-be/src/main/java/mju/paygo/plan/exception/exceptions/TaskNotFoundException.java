package mju.paygo.plan.exception.exceptions;

public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException() {
        super("task를 찾지 못했습니다.");
    }
}
