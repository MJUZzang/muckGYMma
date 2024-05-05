package mju.paygo.preferexercises.exception.exceptions;

public class ExerciseDuplicateException extends RuntimeException {

    public ExerciseDuplicateException() {
        super("각 운동은 한 번만 등록될 수 있습니다.");
    }
}
