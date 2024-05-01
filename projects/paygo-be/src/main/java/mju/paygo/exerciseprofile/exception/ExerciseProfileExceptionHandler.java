package mju.paygo.exerciseprofile.exception;

import mju.paygo.exerciseprofile.exception.exceptions.ExperienceNotFoundException;
import mju.paygo.exerciseprofile.exception.exceptions.FrequencyNotFoundException;
import mju.paygo.exerciseprofile.exception.exceptions.GoalNotFoundException;
import mju.paygo.exerciseprofile.exception.exceptions.LevelNotFoundException;
import mju.paygo.global.exception.dto.ExceptionResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExerciseProfileExceptionHandler {

    @ExceptionHandler(ExperienceNotFoundException.class)
    public HttpEntity<ExceptionResponse> handleExperienceNotFoundException(final ExperienceNotFoundException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(FrequencyNotFoundException.class)
    public HttpEntity<ExceptionResponse> handleFrequencyNotFoundException(final FrequencyNotFoundException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(GoalNotFoundException.class)
    public HttpEntity<ExceptionResponse> handleGoalNotFoundException(final GoalNotFoundException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(LevelNotFoundException.class)
    public HttpEntity<ExceptionResponse> handleLevelNotFoundException(final LevelNotFoundException e) {
        return getBadRequest(e);
    }

    private ResponseEntity<ExceptionResponse> getBadRequest(final Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
