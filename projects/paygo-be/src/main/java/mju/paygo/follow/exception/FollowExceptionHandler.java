package mju.paygo.follow.exception;

import mju.paygo.follow.exception.exceptions.AlreadyFollowingException;
import mju.paygo.follow.exception.exceptions.FollowRelationshipNotFoundException;
import mju.paygo.follow.exception.exceptions.MemberNotFoundException;
import mju.paygo.global.exception.dto.ExceptionResponse;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class FollowExceptionHandler {

    @ExceptionHandler(value = {
            AlreadyFollowingException.class
    })
    public ResponseEntity<ExceptionResponse> handleAlreadyFollowingException(AlreadyFollowingException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(value = {
            FollowRelationshipNotFoundException.class,
            MemberNotFoundException.class
    })
    public ResponseEntity<ExceptionResponse> handleBadRequestException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleValidationException(MethodArgumentNotValidException e) {
        String errorMessage = e.getBindingResult().getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(", "));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(errorMessage));
    }
}
