package mju.paygo.comment.exception;

import mju.paygo.comment.exception.exceptions.BoardNotFoundException;
import mju.paygo.comment.exception.exceptions.CommentNotFoundException;
import mju.paygo.comment.exception.exceptions.InvalidCommentOwnerException;
import mju.paygo.comment.exception.exceptions.MemberNotFoundException;
import mju.paygo.global.exception.dto.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommentExceptionHandler {

    @ExceptionHandler(value = {
            CommentNotFoundException.class,
            InvalidCommentOwnerException.class,
            MemberNotFoundException.class,
            BoardNotFoundException.class
    })
    public ResponseEntity<ExceptionResponse> handleCommentException(Exception e) {
        return getServerError(e);
    }

    private ResponseEntity<ExceptionResponse> getServerError(final Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
