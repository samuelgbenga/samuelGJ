package dev.samuelGJ.real_blog.payload.response;

import lombok.Data;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
public class ExceptionResponse {
	private String error;
	private Integer status;
	private List<String> messages = new ArrayList<>();
	private Instant timestamp;

	public ExceptionResponse(List<String> messages, String error, Integer status) {
		setMessages(messages);
		this.error = error;
		this.status = status;
		this.timestamp = Instant.now();
	}


}
