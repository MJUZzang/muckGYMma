package mju.paygo.physicalprofile.exception;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.physicalprofile.exception.exceptions.BirthInputException;
import mju.paygo.physicalprofile.exception.exceptions.GenderNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PhysicalProfileExceptionHandler {

    @ExceptionHandler(BirthInputException.class)
    public ResponseEntity<ExceptionResponse> handleBirthInputException(final BirthInputException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(GenderNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleGenderNotFoundException(final GenderNotFoundException e) {
        return getBadRequest(e);
    }

    private ResponseEntity<ExceptionResponse> getBadRequest(final Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
