package mju.paygo.plan.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.plan.domain.Plan;
import mju.paygo.plan.domain.PlanRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class PlanRepositoryImpl implements PlanRepository {

    private final PlanJpaRepository planJpaRepository;

    @Override
    public Plan save(final Plan plan) {
        return planJpaRepository.save(plan);
    }

    @Override
    public Optional<Plan> findPlanByMemberAndTask(final Long memberId, final Long taskId) {
        return planJpaRepository.findPlanByMemberAndTask(memberId, taskId);
    }

    @Override
    public Optional<Plan> findPlanByMemberAndId(final Long memberId, final Long planId) {
        return planJpaRepository.findByMemberAndId(memberId, planId);
    }

    @Override
    public List<Plan> findPlansByMemberIdAndStatus(final Long memberId, final Boolean status) {
        return planJpaRepository.findPlansByMemberIdAndStatus(memberId, status);
    }

    @Override
    public List<Plan> findAllByMemberId(final Long memberId) {
        return planJpaRepository.findAllByMemberId(memberId);
    }

    @Override
    public Boolean isAlreadyExisted(final Long memberId, final Long mealId) {
        return planJpaRepository.isAlreadyExisted(memberId, mealId);
    }
}
