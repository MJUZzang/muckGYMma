package mju.paygo.meal.event;

import lombok.RequiredArgsConstructor;
import mju.paygo.meal.application.MealService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class PlanEventHandler {

    private final MealService mealService;

    @EventListener
    public void handlePlanClearedEvent(final PlanClearedEvent event) {
        mealService.clearMealPlan(event.getMemberId(), event.getMealId());
    }
}
