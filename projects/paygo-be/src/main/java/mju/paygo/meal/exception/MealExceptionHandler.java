package mju.paygo.meal.exception;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.meal.exception.exceptions.FileConvertException;
import mju.paygo.meal.exception.exceptions.FileExtensionExtractException;
import mju.paygo.meal.exception.exceptions.FileTransferIOException;
import mju.paygo.meal.exception.exceptions.MealNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MealExceptionHandler {

    @ExceptionHandler(value = {
            FileConvertException.class,
            FileExtensionExtractException.class,
            FileTransferIOException.class
    })
    public ResponseEntity<ExceptionResponse> handleFileTransferException(Exception e) {
        return getServerError(e);
    }

    @ExceptionHandler(value = MealNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleMealNotFoundException(Exception e) {
        return getNotFound(e);
    }

    private ResponseEntity<ExceptionResponse> getServerError(final Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ExceptionResponse(e.getMessage()));
    }

    private ResponseEntity<ExceptionResponse> getNotFound(final Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
