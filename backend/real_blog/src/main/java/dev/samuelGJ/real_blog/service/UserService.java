package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.*;
import dev.samuelGJ.real_blog.security.UserPrincipal;

/**
 * UserService interface
 */
public interface UserService {

    UserSummary getCurrentUser(UserPrincipal currentUser);

    UserIdentityAvailability checkUsernameAvailability(String username);

    UserIdentityAvailability checkEmailAvailability(String email);

    UserProfile getUserProfile(String username);

    User addUser(User user);

    User updateUser(User newUser, String username, UserPrincipal currentUser);

    ApiResponse deleteUser(String username, UserPrincipal currentUser);

    ApiResponse giveAdmin(String username);

    ApiResponse removeAdmin(String username);

    UserProfile setOrUpdateInfo(UserPrincipal currentUser, InfoRequest infoRequest);
}