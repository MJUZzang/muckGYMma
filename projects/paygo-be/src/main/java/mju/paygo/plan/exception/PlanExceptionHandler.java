package mju.paygo.plan.exception;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.plan.exception.exceptions.PlanAlreadyExistedException;
import mju.paygo.plan.exception.exceptions.PlanNotFoundException;
import mju.paygo.plan.exception.exceptions.TaskNotFoundException;
import mju.paygo.plan.exception.exceptions.TaskTypeNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PlanExceptionHandler {

    @ExceptionHandler(TaskTypeNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleTaskTypeNotFoundException(final TaskTypeNotFoundException e) {
        return getNotFound(e);
    }

    @ExceptionHandler({PlanNotFoundException.class, TaskNotFoundException.class})
    public ResponseEntity<ExceptionResponse> handlePlanNotFoundException(final PlanNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(PlanAlreadyExistedException.class)
    public ResponseEntity<ExceptionResponse> handlePlanAlreadyExistedException(final PlanAlreadyExistedException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    private ResponseEntity<ExceptionResponse> getNotFound(final Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
