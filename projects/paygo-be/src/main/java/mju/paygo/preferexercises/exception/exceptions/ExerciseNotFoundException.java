package mju.paygo.preferexercises.exception.exceptions;

public class ExerciseNotFoundException extends RuntimeException {

    public ExerciseNotFoundException() {
        super("해당하는 운동이 없습니다.");
    }
}
