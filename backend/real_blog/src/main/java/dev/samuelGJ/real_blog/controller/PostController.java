package dev.samuelGJ.real_blog.controller;

import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.request.PostRequest;
import dev.samuelGJ.real_blog.payload.request.PostUpdateRequest;
import dev.samuelGJ.real_blog.payload.response.PostResponseDto;
import dev.samuelGJ.real_blog.security.CurrentUser;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.ClapService;
import dev.samuelGJ.real_blog.service.PostService;
import dev.samuelGJ.real_blog.constant.AppConstants;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;



@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;

	private final ClapService clapService;

	@GetMapping
	public ResponseEntity<PagedResponse<PostResponseDto>> getAllPosts(
			@RequestParam(value = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
			@RequestParam(value = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {
		PagedResponse<PostResponseDto> response = postService.getAllPosts(page, size);

		return new ResponseEntity< >(response, HttpStatus.OK);
	}

	@GetMapping("/category/{id}")
	public ResponseEntity<PagedResponse<PostResponseDto>> getPostsByCategory(
			@RequestParam(value = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
			@RequestParam(value = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size,
			@PathVariable(name = "id") Long id) {
		PagedResponse<PostResponseDto> response = postService.getPostsByCategory(id, page, size);

		return new ResponseEntity< >(response, HttpStatus.OK);
	}

	@GetMapping("/tag/{id}")
	public ResponseEntity<PagedResponse<PostResponseDto>> getPostsByTag(
			@RequestParam(value = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
			@RequestParam(value = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size,
			@PathVariable(name = "id") Long id) {
		PagedResponse<PostResponseDto> response = postService.getPostsByTag(id, page, size);

		return new ResponseEntity< >(response, HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PostResponseDto> addPost(@Valid @ModelAttribute PostRequest postRequest,
												@CurrentUser UserPrincipal currentUser) {
		PostResponseDto postResponse = postService.addPost(postRequest, currentUser);

		return new ResponseEntity< >(postResponse, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<PostResponseDto> getPost(@PathVariable(name = "id") Long id) {
		PostResponseDto post = postService.getPost(id);

		return new ResponseEntity< >(post, HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PostResponseDto> updatePost(@PathVariable(name = "id") Long id,
			@RequestBody PostUpdateRequest newPostRequest, @CurrentUser UserPrincipal currentUser) {
		PostResponseDto post = postService.updatePost(id, newPostRequest, currentUser);

		return new ResponseEntity< >(post, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deletePost(@PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		ApiResponse apiResponse = postService.deletePost(id, currentUser);

		return new ResponseEntity< >(apiResponse, HttpStatus.OK);
	}

	@PutMapping(value="/update_photo/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PostResponseDto> updateAlbum( @PathVariable(name = "id") Long id,
            @RequestPart("multipartFiles") MultipartFile multipartFiles,
            @CurrentUser UserPrincipal currentUser) {
				
				PostResponseDto response = postService.updatePostPhoto(id, multipartFiles, currentUser);

        return ResponseEntity.ok( response) ;
    }

	@PostMapping("/{postId}/clap")
	public ResponseEntity<ApiResponse> addClapToPost(
			@PathVariable Long postId,
			@RequestParam String anonymousId) {
		boolean success = clapService.addClap(anonymousId, postId);
		
		if (success) {
			return new ResponseEntity<>(new ApiResponse(true, "Clap added successfully"), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new ApiResponse(false, "Maximum claps reached (7) for this user on this post"), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{postId}/claps")
	public ResponseEntity<Integer> getTotalClapsForPost(@PathVariable Long postId) {
		int totalClaps = clapService.getTotalClapsByPostId(postId);
		return new ResponseEntity<>(totalClaps, HttpStatus.OK);
	}
}
