package mju.paygo.board.exception;

import mju.paygo.board.exception.exceptions.BoardNotFoundException;
import mju.paygo.board.exception.exceptions.InvalidBoardIdException;
import mju.paygo.board.exception.exceptions.InvalidMemberException;
import mju.paygo.board.exception.exceptions.InvalidMemberIdException;
import mju.paygo.board.exception.exceptions.MealNotFoundException;
import mju.paygo.global.exception.dto.ExceptionResponse;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.stream.Collectors;

@RestControllerAdvice
public class BoardExceptionHandler {

    @ExceptionHandler(value = {
            BoardNotFoundException.class,
            InvalidBoardIdException.class,
            InvalidMemberIdException.class,
            MealNotFoundException.class,
            MaxUploadSizeExceededException.class
    })
    public ResponseEntity<ExceptionResponse> handleBadRequestException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(value = {
            InvalidMemberException.class
    })
    public ResponseEntity<ExceptionResponse> handleForbiddenException(InvalidMemberException e) {
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
