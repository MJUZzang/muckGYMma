package mju.paygo.member.exception.exceptions;

import mju.paygo.global.exception.dto.ExceptionResponse;
import mju.paygo.member.exception.exceptions.auth.ExpiredTokenException;
import mju.paygo.member.exception.exceptions.auth.LoginInvalidException;
import mju.paygo.member.exception.exceptions.auth.OAuthAccessException;
import mju.paygo.member.exception.exceptions.auth.OAuthPlatformNotFoundException;
import mju.paygo.member.exception.exceptions.auth.SignatureInvalidException;
import mju.paygo.member.exception.exceptions.auth.TokenFormInvalidException;
import mju.paygo.member.exception.exceptions.auth.TokenInvalidException;
import mju.paygo.member.exception.exceptions.auth.UnsupportedTokenException;
import mju.paygo.member.exception.exceptions.member.MemberNotInitializedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

@RestControllerAdvice
public class MemberExceptionHandler {

    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<ExceptionResponse> handleHttpClientErrorException(final HttpClientErrorException e) {
        return getBadRequest(new OAuthAccessException());
    }

    @ExceptionHandler(OAuthPlatformNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleOAuthPlatformNotFoundException(final OAuthPlatformNotFoundException e) {
        return getNotFound(e);
    }

    @ExceptionHandler(MemberNotInitializedException.class)
    public ResponseEntity<ExceptionResponse> handleMemberNotInitializedException(final MemberNotInitializedException e) {
        return getBadRequest(e);
    }

    @ExceptionHandler(value = {
            ExpiredTokenException.class,
            LoginInvalidException.class,
            SignatureInvalidException.class,
            TokenFormInvalidException.class,
            TokenInvalidException.class,
            UnsupportedTokenException.class
    })
    public ResponseEntity<ExceptionResponse> handleAuthException(final Exception e) {
        return getUnAuthorized(e);
    }

    private ResponseEntity<ExceptionResponse> getBadRequest(final Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    private ResponseEntity<ExceptionResponse> getNotFound(final Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse(e.getMessage()));
    }

    private ResponseEntity<ExceptionResponse> getUnAuthorized(final Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ExceptionResponse(e.getMessage()));
    }
}
