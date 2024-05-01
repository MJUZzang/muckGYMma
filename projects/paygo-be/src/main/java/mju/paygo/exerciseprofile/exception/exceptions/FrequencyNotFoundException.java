package mju.paygo.exerciseprofile.exception.exceptions;

public class FrequencyNotFoundException extends RuntimeException {

    public FrequencyNotFoundException() {
        super("운동 빈도를 찾을 수 없습니다.");
    }
}
