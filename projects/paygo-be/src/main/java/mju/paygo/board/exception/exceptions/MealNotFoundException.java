package mju.paygo.board.exception.exceptions;

public class MealNotFoundException extends RuntimeException {

    public MealNotFoundException() {
        super("식사를 찾을 수 없습니다.");
    }
}

