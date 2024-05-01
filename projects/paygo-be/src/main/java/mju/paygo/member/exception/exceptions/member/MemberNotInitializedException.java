package mju.paygo.member.exception.exceptions.member;

public class MemberNotInitializedException extends RuntimeException {

    public MemberNotInitializedException() {
        super("아직 초기 정보가 등록되지 않았습니다.");
    }
}
