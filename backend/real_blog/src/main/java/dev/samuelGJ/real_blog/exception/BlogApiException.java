package dev.samuelGJ.real_blog.exception;

import org.springframework.http.HttpStatus;

public class BlogApiException extends RuntimeException {
	private static final long serialVersionUID = -6593330219878485669L;
	public BlogApiException( String message) {
		super(message);

	}



}
