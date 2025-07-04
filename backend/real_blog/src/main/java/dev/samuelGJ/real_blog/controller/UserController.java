package dev.samuelGJ.real_blog.controller;


import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.*;
import dev.samuelGJ.real_blog.payload.request.AddUserRequestDto;
import dev.samuelGJ.real_blog.payload.request.InfoRequest;
import dev.samuelGJ.real_blog.payload.request.UserUpdateDto;
import dev.samuelGJ.real_blog.payload.response.*;
import dev.samuelGJ.real_blog.security.CurrentUser;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.AlbumService;
import dev.samuelGJ.real_blog.service.PostService;
import dev.samuelGJ.real_blog.service.UserService;
import dev.samuelGJ.real_blog.constant.AppConstants;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;


	private final PostService postService;


	private final AlbumService albumService;

	@GetMapping("/me")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<UserSummary> getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		UserSummary userSummary = userService.getCurrentUser(currentUser);

		return new ResponseEntity< >(userSummary, HttpStatus.OK);
	}

	@GetMapping("/checkUsernameAvailability")
	public ResponseEntity<UserIdentityAvailabilityResponse> checkUsernameAvailability(@RequestParam(value = "username") String username) {
		UserIdentityAvailabilityResponse userIdentityAvailabilityResponse = userService.checkUsernameAvailability(username);

		return new ResponseEntity< >(userIdentityAvailabilityResponse, HttpStatus.OK);
	}

	@GetMapping("/checkEmailAvailability")
	public ResponseEntity<UserIdentityAvailabilityResponse> checkEmailAvailability(@RequestParam(value = "email") String email) {
		UserIdentityAvailabilityResponse userIdentityAvailabilityResponse = userService.checkEmailAvailability(email);
		return new ResponseEntity< >(userIdentityAvailabilityResponse, HttpStatus.OK);
	}

	@GetMapping("/{username}/profile")
	public ResponseEntity<UserProfile> getUSerProfile(@PathVariable(value = "username") String username) {
		UserProfile userProfile = userService.getUserProfile(username);

		return new ResponseEntity< >(userProfile, HttpStatus.OK);
	}

	@GetMapping("/{username}/posts")
	public ResponseEntity<PagedResponse<PostResponseDto>> getPostsCreatedBy(@PathVariable(value = "username") String username,
																			@RequestParam(value = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
																			@RequestParam(value = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {
		PagedResponse<PostResponseDto> response = postService.getPostsByCreatedBy(username, page, size);

		return new ResponseEntity<  >(response, HttpStatus.OK);
	}

	@GetMapping("/{username}/albums")
	public ResponseEntity<PagedResponse<AlbumResponse>> getUserAlbums(@PathVariable(name = "username") String username,
															  @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
															  @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {

		PagedResponse<AlbumResponse> response = albumService.getUserAlbums(username, page, size);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<UserProfile> addUser(@Valid @RequestBody AddUserRequestDto user) {
		UserProfile newUser = userService.addUser(user);

		return new ResponseEntity< >(newUser, HttpStatus.CREATED);
	}

	@PutMapping("/{username}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<UserProfile> updateUser(@Valid @RequestBody UserUpdateDto newUser,
			@PathVariable(value = "username") String username, @CurrentUser UserPrincipal currentUser) {
		UserProfile updatedUSer = userService.updateUser(newUser, username, currentUser);

		return new ResponseEntity< >(updatedUSer, HttpStatus.CREATED);
	}

	@DeleteMapping("/{username}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable(value = "username") String username,
												  @CurrentUser UserPrincipal currentUser) {
		ApiResponse apiResponse = userService.deleteUser(username, currentUser);

		return new ResponseEntity< >(apiResponse, HttpStatus.OK);
	}

	@PutMapping("/{username}/giveAdmin")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> giveAdmin(@PathVariable(name = "username") String username) {
		ApiResponse apiResponse = userService.giveAdmin(username);

		return new ResponseEntity< >(apiResponse, HttpStatus.OK);
	}

	@PutMapping("/{username}/takeAdmin")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> takeAdmin(@PathVariable(name = "username") String username) {
		ApiResponse apiResponse = userService.removeAdmin(username);

		return new ResponseEntity< >(apiResponse, HttpStatus.OK);
	}

	@PutMapping("/setOrUpdateInfo")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<UserProfile> setAddress(@CurrentUser UserPrincipal currentUser,
			@Valid @RequestBody InfoRequest infoRequest) {
		UserProfile userProfile = userService.setOrUpdateInfo(currentUser, infoRequest);

		return new ResponseEntity< >(userProfile, HttpStatus.OK);
	}

}
