package mju.paygo.member.exception.exceptions.member;

public class BlankContainsException extends RuntimeException {

    public BlankContainsException() {
        super("공백이 포함되면 안 됩니다.");
    }
}
