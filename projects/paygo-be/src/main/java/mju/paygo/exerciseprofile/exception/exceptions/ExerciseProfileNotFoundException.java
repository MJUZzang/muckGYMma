package mju.paygo.exerciseprofile.exception.exceptions;

public class ExerciseProfileNotFoundException extends RuntimeException {

    public ExerciseProfileNotFoundException() {
        super("회원의 운동 프로필이 없습니다.");
    }
}
