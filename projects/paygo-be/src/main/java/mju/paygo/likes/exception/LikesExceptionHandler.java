package mju.paygo.likes.exception;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.likes.exception.exception.BoardNotFoundException;
import mju.paygo.likes.exception.exception.LikeAlreadyExistsException;
import mju.paygo.likes.exception.exception.LikeNotFoundException;
import mju.paygo.likes.exception.exception.MemberNotFoundException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class LikesExceptionHandler {

    @ExceptionHandler(value = {
            LikeAlreadyExistsException.class
    })
    public ResponseEntity<ExceptionResponse> handleAlreadyExistsException(LikeAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(value = {
            LikeNotFoundException.class,
            MemberNotFoundException.class,
            BoardNotFoundException.class
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

