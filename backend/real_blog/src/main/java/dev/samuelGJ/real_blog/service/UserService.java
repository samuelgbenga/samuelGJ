package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.payload.*;
import dev.samuelGJ.real_blog.payload.request.InfoRequest;
import dev.samuelGJ.real_blog.payload.request.AddUserRequestDto;
import dev.samuelGJ.real_blog.payload.request.UserUpdateDto;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.UserIdentityAvailabilityResponse;
import dev.samuelGJ.real_blog.security.UserPrincipal;

/**
 * UserService interface
 */
public interface UserService {

    UserSummary getCurrentUser(UserPrincipal currentUser);

    UserIdentityAvailabilityResponse checkUsernameAvailability(String username);

    UserIdentityAvailabilityResponse checkEmailAvailability(String email);

    UserProfile getUserProfile(String username);

    UserProfile addUser(AddUserRequestDto user);

    UserProfile updateUser(UserUpdateDto dto, String username, UserPrincipal currentUser);

    ApiResponse deleteUser(String username, UserPrincipal currentUser);

    ApiResponse giveAdmin(String username);

    ApiResponse removeAdmin(String username);

    UserProfile setOrUpdateInfo(UserPrincipal currentUser, InfoRequest infoRequest);
}