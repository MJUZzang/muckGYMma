package mju.paygo.prefersports.exception;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.prefersports.exception.exceptions.SportsDuplicateException;
import mju.paygo.prefersports.exception.exceptions.SportsNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PreferSportsExceptionHandler {

    @ExceptionHandler(SportsDuplicateException.class)
    public HttpEntity<ExceptionResponse> handleSportsDuplicateException(final SportsDuplicateException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(SportsNotFoundException.class)
    public HttpEntity<ExceptionResponse> handleSportsNotFoundException(final SportsNotFoundException e) {
        return getBadRequest(e);
    }

    private ResponseEntity<ExceptionResponse> getBadRequest(final Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
