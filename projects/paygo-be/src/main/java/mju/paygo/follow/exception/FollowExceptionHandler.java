package mju.paygo.follow.exception;

import mju.paygo.follow.exception.exceptions.AlreadyFollowingException;
import mju.paygo.follow.exception.exceptions.FollowRelationshipNotFoundException;
import mju.paygo.follow.exception.exceptions.MemberNotFoundException;
import mju.paygo.global.exception.dto.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class FollowExceptionHandler {

    @ExceptionHandler(value = {
            AlreadyFollowingException.class,
            FollowRelationshipNotFoundException.class,
            MemberNotFoundException.class
    })
    public ResponseEntity<ExceptionResponse> handleFollowException(Exception e) {
        return getServerError(e);
    }

    private ResponseEntity<ExceptionResponse> getServerError(final Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
