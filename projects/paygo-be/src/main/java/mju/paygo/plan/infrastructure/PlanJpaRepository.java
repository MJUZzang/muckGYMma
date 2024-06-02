package mju.paygo.plan.infrastructure;

import mju.paygo.plan.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PlanJpaRepository extends JpaRepository<Plan, Long> {

    Plan save(Plan plan);

    @Query("SELECT p FROM Plan p JOIN p.tasks t WHERE p.memberId = :memberId AND t.id = :taskId")
    Optional<Plan> findPlanByMemberAndTask(Long memberId, Long taskId);

    @Query("SELECT p FROM Plan p WHERE p.memberId = :memberId AND p.id = :planId")
    Optional<Plan> findByMemberAndId(Long memberId, Long planId);

    @Query("SELECT p FROM Plan p WHERE p.memberId = :memberId AND p.cleared = :status")
    List<Plan> findPlansByMemberIdAndStatus(Long memberId, Boolean status);

    @Query("SELECT p FROM Plan p WHERE p.memberId = :memberId")
    List<Plan> findAllByMemberId(Long memberId);

    @Query("SELECT count(p.id) > 0 FROM Plan p WHERE p.memberId = :memberId AND p.mealId = :mealId")
    boolean isAlreadyExisted(Long memberId, Long mealId);

    @Query("SELECT p FROM Plan p WHERE p.memberId = :memberId AND p.mealId =:mealId")
    Optional<Plan> findPlanByMemberAndMeal(Long memberId, Long mealId);
}
