package mju.paygo.plan.domain;

import java.util.List;
import java.util.Optional;

public interface PlanRepository {

    Plan save(Plan plan);
    Optional<Plan> findPlanByMemberAndTask(Long memberId, Long taskId);
    Optional<Plan> findPlanByMemberAndId(Long memberId, Long planId);
    List<Plan> findPlansByMemberIdAndStatus(Long memberId, Boolean status);
    List<Plan> findAllByMemberId(Long memberId);
    Boolean isAlreadyExisted(Long memberId, Long mealId);
    Optional<Plan> findPlanByMemberAndMeal(Long memberId, Long mealId);
}
