package dev.samuelGJ.real_blog.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

	private final ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
			throws IOException, ServletException {
		response.setContentType("application/json");
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

		final Map<String, Object> body = new HashMap<>();
		body.put("error", "Unauthorized");

		// 👇 Check if a token exception attribute exists
		final Exception tokenException = (Exception) request.getAttribute("token_exception");

		if (tokenException != null) {
			body.put("message", tokenException.getMessage());
			LOGGER.error(tokenException.getMessage());
		} else {
			body.put("message", "Token is missing");
			LOGGER.error("Token is Missing");
		}

		objectMapper.writeValue(response.getOutputStream(), body);
	}
}
