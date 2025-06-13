package dev.samuelGJ.real_blog.controller;


import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.JwtAuthenticationResponse;
import dev.samuelGJ.real_blog.payload.request.LoginRequest;
import dev.samuelGJ.real_blog.payload.request.SignUpRequest;
import dev.samuelGJ.real_blog.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import dev.samuelGJ.real_blog.exception.InvalidCredentialsException;
import dev.samuelGJ.real_blog.exception.BlogApiException;

import java.net.URI;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/signIn")
	public ResponseEntity<JwtAuthenticationResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		try {
			return ResponseEntity.ok(authService.signIn(loginRequest));
		} catch (InvalidCredentialsException e) {
			throw e;
		} catch (Exception e) {
			throw new BlogApiException("Authentication failed: " + e.getMessage());
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{userId}")
				.buildAndExpand(authService.signup(signUpRequest).getId()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(Boolean.TRUE, "User registered successfully"));
	}
}
