package mju.paygo.task.ui;

import lombok.RequiredArgsConstructor;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import mju.paygo.task.application.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/task")
@RestController
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/ask/{mealId}")
    public ResponseEntity<String> questionExercises(@AuthMember final Long memberId, @PathVariable final Long mealId) {
        String response = taskService.questionExercises(memberId, mealId);
        return ResponseEntity.ok().body(response);
    }
}
