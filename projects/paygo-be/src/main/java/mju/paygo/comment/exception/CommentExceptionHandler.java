package mju.paygo.comment.exception;

import mju.paygo.comment.exception.exceptions.BoardNotFoundException;
import mju.paygo.comment.exception.exceptions.CommentNotFoundException;
import mju.paygo.comment.exception.exceptions.InvalidCommentOwnerException;
import mju.paygo.comment.exception.exceptions.MemberNotFoundException;
import mju.paygo.global.exception.dto.ExceptionResponse;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class CommentExceptionHandler {

    @ExceptionHandler(value = {
            CommentNotFoundException.class,
            MemberNotFoundException.class,
            BoardNotFoundException.class
    })
    public ResponseEntity<ExceptionResponse> handleBadRequestException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(value = {
            InvalidCommentOwnerException.class
    })
    public ResponseEntity<ExceptionResponse> handleForbiddenException(InvalidCommentOwnerException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
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
