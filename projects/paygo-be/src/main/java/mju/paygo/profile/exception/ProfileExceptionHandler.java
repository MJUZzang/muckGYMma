package mju.paygo.profile.exception;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.profile.exception.exceptions.MemberNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ProfileExceptionHandler {

    @ExceptionHandler(value = {
            MemberNotFoundException.class
    })
    public ResponseEntity<ExceptionResponse> handleProfileException(Exception e) {
        return getServerError(e);
    }

    private ResponseEntity<ExceptionResponse> getServerError(final Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
