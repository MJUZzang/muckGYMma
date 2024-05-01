package mju.paygo.preferexercises.exception;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.preferexercises.exception.exceptions.ExerciseDuplicateException;
import mju.paygo.preferexercises.exception.exceptions.ExerciseNotFoundException;
import mju.paygo.preferexercises.exception.exceptions.PreferExerciseNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PreferExercisesExceptionHandler {

    @ExceptionHandler(ExerciseDuplicateException.class)
    public ResponseEntity<ExceptionResponse> handleExerciseDuplicateException(final ExerciseDuplicateException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(ExerciseNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleExerciseNotFoundException(final ExerciseNotFoundException e) {
        return getNotFound(e);
    }

    @ExceptionHandler(PreferExerciseNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handlePreferExerciseNotFoundException(final PreferExerciseNotFoundException e) {
        return getNotFound(e);
    }

    private ResponseEntity<ExceptionResponse> getNotFound(final Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse(e.getMessage()));
    }

    private ResponseEntity<ExceptionResponse> getBadRequest(final Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
