package mju.paygo.exerciseprofile.exception.exceptions;

public class ExperienceNotFoundException extends RuntimeException {

    public ExperienceNotFoundException() {
        super("운동 경험을 찾을 수 없습니다.");
    }
}
