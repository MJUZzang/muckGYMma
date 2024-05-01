package mju.paygo.preferexercises.exception.exceptions;

public class PreferExerciseNotFoundException extends RuntimeException {

    public PreferExerciseNotFoundException() {
        super("회원의 선호 운동이 없습니다.");
    }
}
