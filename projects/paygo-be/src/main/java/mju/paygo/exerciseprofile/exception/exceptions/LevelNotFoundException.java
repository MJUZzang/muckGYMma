package mju.paygo.exerciseprofile.exception.exceptions;

public class LevelNotFoundException extends RuntimeException {

    public LevelNotFoundException() {
        super("운동 레벨을 찾을 수 없습니다.");
    }
}
