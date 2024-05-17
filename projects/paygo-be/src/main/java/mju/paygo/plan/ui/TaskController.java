package mju.paygo.plan.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import mju.paygo.plan.application.PlanService;
import mju.paygo.plan.application.dto.TaskDoneRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/task")
@RestController
public class TaskController {

    private final PlanService planService;

    @PostMapping("/ask/{mealId}")
    public ResponseEntity<String> questionExercises(@AuthMember final Long memberId, @PathVariable final Long mealId) {
        String response = planService.questionExercises(memberId, mealId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/done/{taskId}")
    public ResponseEntity<Void> doneTask(@AuthMember final Long memberId,
                                         @PathVariable final Long taskId,
                                         @RequestBody @Valid final TaskDoneRequest request)  {
        planService.doneTask(memberId, taskId, request.time());

        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
