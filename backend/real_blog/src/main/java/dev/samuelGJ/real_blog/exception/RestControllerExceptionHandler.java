package dev.samuelGJ.real_blog.exception;

import dev.samuelGJ.real_blog.payload.response.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;
import java.util.*;

@RestControllerAdvice
public class RestControllerExceptionHandler {


	@ExceptionHandler(UnauthorizedException.class)
	public ResponseEntity<Object> handleUnauthorizedException(UnauthorizedException ex) {
		return buildErrorResponse(HttpStatus.UNAUTHORIZED, ex.getMessage(), null);
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<Object> handleBadRequestException(BadRequestException ex) {
		return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), null);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex) {
		return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage(), null);
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException ex) {
		return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), null);
	}

	@ExceptionHandler(AppException.class)
	public ResponseEntity<Object> handleException(AppException ex) {
		return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), null);
	}

	@ExceptionHandler(BlogApiException.class)
	public ResponseEntity<Object> handleException(BlogApiException ex) {
		return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), null);
	}

	@ExceptionHandler(ResponseEntityErrorException.class)
	public ResponseEntity<Object> handleException(ResponseEntityErrorException ex) {
		return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage(), null);
	}

	@ExceptionHandler({ MethodArgumentNotValidException.class })
	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ExceptionResponse> resolveException(MethodArgumentNotValidException ex) {
		List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
		List<String> messages = new ArrayList<>(fieldErrors.size());
		for (FieldError error : fieldErrors) {
			messages.add(error.getField() + " - " + error.getDefaultMessage());
		}
		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.BAD_REQUEST.getReasonPhrase(),
				HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ MethodArgumentTypeMismatchException.class })
	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ExceptionResponse> resolveException(MethodArgumentTypeMismatchException ex) {
		String message = "Parameter '" + ex.getParameter().getParameterName() + "' must be '"
				+ Objects.requireNonNull(ex.getRequiredType()).getSimpleName() + "'";
		List<String> messages = new ArrayList<>(1);
		messages.add(message);
		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.BAD_REQUEST.getReasonPhrase(),
				HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ HttpRequestMethodNotSupportedException.class })
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	@ResponseBody
	public ResponseEntity<ExceptionResponse> resolveException(HttpRequestMethodNotSupportedException ex) {
		String message = "Request method '" + ex.getMethod() + "' not supported. List of all supported methods - "
				+ ex.getSupportedHttpMethods();
		List<String> messages = new ArrayList<>(1);
		messages.add(message);

		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.METHOD_NOT_ALLOWED.getReasonPhrase(),
				HttpStatus.METHOD_NOT_ALLOWED.value()), HttpStatus.METHOD_NOT_ALLOWED);
	}

	@ExceptionHandler({ HttpMessageNotReadableException.class })
	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ExceptionResponse> resolveException(HttpMessageNotReadableException ex) {
		String message = "Please provide Request Body in valid JSON format";
		List<String> messages = new ArrayList<>(1);
		messages.add(message);
		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.BAD_REQUEST.getReasonPhrase(),
				HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ IllegalArgumentException.class })
	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ExceptionResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
		List<String> messages = new ArrayList<>(1);
		messages.add("Bad request: " + ex.getMessage());
		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.BAD_REQUEST.getReasonPhrase(),
				HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity<ExceptionResponse> handleAllUncaughtException(Exception ex) {
		List<String> messages = new ArrayList<>(1);
		messages.add("An unexpected error occurred: " + ex.getMessage());
		return new ResponseEntity<>(new ExceptionResponse(messages, HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
				HttpStatus.INTERNAL_SERVER_ERROR.value()), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private ResponseEntity<Object> buildErrorResponse(HttpStatus status, String message, Map<String, Object> errors) {
		Map<String, Object> body = new HashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("status", status.value());
		body.put("error", status.getReasonPhrase());
		body.put("message", message);
		body.put("errors", errors);
		return new ResponseEntity<>(body, status);
	}
}
