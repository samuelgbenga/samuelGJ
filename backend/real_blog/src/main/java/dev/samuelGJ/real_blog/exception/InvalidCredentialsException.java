package dev.samuelGJ.real_blog.exception;

import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends BlogApiException {
    private static final long serialVersionUID = 1L;

    public InvalidCredentialsException() {
        super("Invalid username or password");
    }
} 