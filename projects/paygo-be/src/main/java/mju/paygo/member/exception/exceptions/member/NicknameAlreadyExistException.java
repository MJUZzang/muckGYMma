package mju.paygo.member.exception.exceptions.member;

public class NicknameAlreadyExistException extends RuntimeException {

    public NicknameAlreadyExistException() {
        super("이미 존재하는 닉네임입니다.");
    }
}
