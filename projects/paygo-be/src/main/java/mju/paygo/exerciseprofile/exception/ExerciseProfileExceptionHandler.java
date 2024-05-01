package mju.paygo.exerciseprofile.exception;

import mju.paygo.exerciseprofile.exception.exceptions.ExerciseProfileNotFoundException;
import mju.paygo.exerciseprofile.exception.exceptions.ExperienceNotFoundException;
import mju.paygo.exerciseprofile.exception.exceptions.FrequencyNotFoundException;
import mju.paygo.exerciseprofile.exception.exceptions.GoalNotFoundException;
import mju.paygo.exerciseprofile.exception.exceptions.LevelNotFoundException;
import mju.paygo.global.exception.dto.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExerciseProfileExceptionHandler {

    @ExceptionHandler(ExperienceNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleExperienceNotFoundException(final ExperienceNotFoundException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(FrequencyNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleFrequencyNotFoundException(final FrequencyNotFoundException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(GoalNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleGoalNotFoundException(final GoalNotFoundException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(LevelNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleLevelNotFoundException(final LevelNotFoundException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(ExerciseProfileNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleExerciseProfileNotFoundException(final ExerciseProfileNotFoundException e) {
        return getNotFound(e);
    }

    private ResponseEntity<ExceptionResponse> getBadRequest(final Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    private ResponseEntity<ExceptionResponse> getNotFound(final Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
