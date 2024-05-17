package mju.paygo.board.exception;

import mju.paygo.board.exception.exceptions.BoardNotFoundException;
import mju.paygo.board.exception.exceptions.InvalidBoardIdException;
import mju.paygo.board.exception.exceptions.InvalidMemberException;
import mju.paygo.board.exception.exceptions.InvalidMemberIdException;
import mju.paygo.global.exception.dto.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BoardExceptionHandler {

    @ExceptionHandler(value = {
            BoardNotFoundException.class,
            InvalidMemberException.class,
            InvalidBoardIdException.class,
            InvalidMemberIdException.class
    })
    public ResponseEntity<ExceptionResponse> handleBoardException(Exception e) {
        return getServerError(e);
    }

    private ResponseEntity<ExceptionResponse> getServerError(final Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
