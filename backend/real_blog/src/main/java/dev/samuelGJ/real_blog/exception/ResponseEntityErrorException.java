package dev.samuelGJ.real_blog.exception;


import java.io.Serial;

public class ResponseEntityErrorException extends RuntimeException {
	@Serial
	private static final long serialVersionUID = -3156815846745801694L;
	public ResponseEntityErrorException(String message) {
		super(message);
	}
}
