package mju.paygo.likes.exception;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.likes.exception.exception.BoardNotFoundException;
import mju.paygo.likes.exception.exception.LikeAlreadyExistsException;
import mju.paygo.likes.exception.exception.LikeNotFoundException;
import mju.paygo.likes.exception.exception.MemberNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class LikesExceptionHandler {

    @ExceptionHandler(value = {
            LikeAlreadyExistsException.class,
            LikeNotFoundException.class,
            MemberNotFoundException.class,
            BoardNotFoundException.class
    })
    public ResponseEntity<ExceptionResponse> handleLikesException(Exception e) {
        return getServerError(e);
    }

    private ResponseEntity<ExceptionResponse> getServerError(final Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
