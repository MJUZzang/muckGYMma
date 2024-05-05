package mju.paygo.prefersports.exception.exceptions;

public class SportsNotFoundException extends RuntimeException {

    public SportsNotFoundException() {
        super("해당하는 스포츠가 없습니다.");
    }
}
