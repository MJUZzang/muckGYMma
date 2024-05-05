package mju.paygo.exerciseprofile.exception.exceptions;

public class GoalNotFoundException extends RuntimeException {

    public GoalNotFoundException() {
        super("운동 목표를 찾을 수 없습니다.");
    }
}
