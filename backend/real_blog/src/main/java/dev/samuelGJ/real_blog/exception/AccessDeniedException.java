package dev.samuelGJ.real_blog.exception;

import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public class AccessDeniedException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	public AccessDeniedException(String message) {
		super(message);
	}
}
