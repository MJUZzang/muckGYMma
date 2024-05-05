package mju.paygo.exercise.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.exercise.application.dto.PromptCreateRequest;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/ai")
@RestController
public class ExerciseController {

    private final OpenAiChatClient chatClient;

    @PostMapping("/generate")
    public Map generate(@RequestBody @Valid final PromptCreateRequest request) {
        return Map.of("generation", chatClient.call(request.message()));
    }
}
