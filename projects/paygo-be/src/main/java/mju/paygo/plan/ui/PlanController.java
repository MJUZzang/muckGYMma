package mju.paygo.plan.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.plan.application.dto.MealPlanFindRequest;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import mju.paygo.plan.application.PlanService;
import mju.paygo.plan.application.dto.PlanCreateRequest;
import mju.paygo.plan.domain.Plan;
import mju.paygo.plan.ui.dto.PlanInnerResponse;
import mju.paygo.plan.ui.dto.PlanOuterResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/plans")
@RestController
public class PlanController {

    private final PlanService planService;

    @GetMapping
    public ResponseEntity<List<PlanOuterResponse>> findAllPlans(@AuthMember final Long memberId) {
        List<Plan> plans = planService.allPlans(memberId);
        List<PlanOuterResponse> responses = new ArrayList<>();
        plans.forEach(plan -> {
            responses.add(PlanOuterResponse.from(plan));
        });
        return ResponseEntity.ok()
                .body(responses);
    }

    @GetMapping("/{planId}")
    public ResponseEntity<PlanInnerResponse> findInnerPlan(@AuthMember final Long memberId,
                                                           @PathVariable final Long planId) {
        Plan plan = planService.findPlanByMemberAndId(memberId, planId);
        return ResponseEntity.ok()
                .body(PlanInnerResponse.from(plan));
    }

    @PostMapping("/add/{mealId}")
    public ResponseEntity<Long> addPlan(@AuthMember final Long memberId,
                                        @PathVariable final Long mealId,
                                        @RequestBody final PlanCreateRequest request) {
        Plan plan = planService.addPlan(memberId, mealId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(plan.getId());
    }

    @GetMapping("/remain")
    public ResponseEntity<List<PlanOuterResponse>> findRemainPlan(@AuthMember final Long memberId) {
        List<Plan> remainPlans = planService.remainPlans(memberId);
        List<PlanOuterResponse> responses = new ArrayList<>();
        remainPlans.forEach(remain -> {
            responses.add(PlanOuterResponse.from(remain));
        });
        return ResponseEntity.ok()
                .body(responses);
    }

    @GetMapping("/meal")
    public ResponseEntity<Long> findPlanIdByMeal(@AuthMember final Long memberId, @RequestBody @Valid final MealPlanFindRequest request) {
        Long planId = planService.findPlanIdByMemberAndMeal(memberId, request.mealId());
        return ResponseEntity.ok()
                .body(planId);
    }
}
