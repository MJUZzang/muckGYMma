package mju.paygo.meal.exception.exceptions;

public class MealNotFoundException extends RuntimeException {

    public MealNotFoundException() {
        super("해당 식사를 찾을 수 없습니다.");
    }
}
