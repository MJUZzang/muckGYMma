package mju.paygo.board.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.application.event.BoardCreatedEvent;
import mju.paygo.board.exception.exceptions.MealNotFoundException;
import mju.paygo.meal.domain.Meal;
import mju.paygo.meal.domain.MealRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class BoardEventListener {

    private final MealRepository mealRepository;

    @EventListener
    public void handleBoardCreatedEvent(final BoardCreatedEvent event) {
        markMealAsPosted(event.getMealId());
    }

    private void markMealAsPosted(final Long mealId) {
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(MealNotFoundException::new);

        meal.clearUpload();
        mealRepository.save(meal);
    }
}
