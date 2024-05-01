package mju.paygo.prefersports.exception;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.prefersports.exception.exceptions.PreferSportsNotFoundException;
import mju.paygo.prefersports.exception.exceptions.SportsDuplicateException;
import mju.paygo.prefersports.exception.exceptions.SportsNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PreferSportsExceptionHandler {

    @ExceptionHandler(SportsDuplicateException.class)
    public ResponseEntity<ExceptionResponse> handleSportsDuplicateException(final SportsDuplicateException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(SportsNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleSportsNotFoundException(final SportsNotFoundException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(PreferSportsNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handlePreferSportsNotFoundException(final PreferSportsNotFoundException e) {
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
