package mju.paygo.prefersports.exception.exceptions;

public class PreferSportsNotFoundException extends RuntimeException {

    public PreferSportsNotFoundException() {
        super("회원의 선호 스포츠가 없습니다.");
    }
}
