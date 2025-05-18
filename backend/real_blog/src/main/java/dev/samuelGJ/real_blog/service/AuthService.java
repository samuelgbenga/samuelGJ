package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.request.LoginRequest;
import dev.samuelGJ.real_blog.payload.request.SignUpRequest;
import dev.samuelGJ.real_blog.payload.response.JwtAuthenticationResponse;

public interface AuthService {
    User signup(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signIn(LoginRequest request);
}
