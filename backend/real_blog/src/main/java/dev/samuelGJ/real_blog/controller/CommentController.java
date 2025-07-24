package dev.samuelGJ.real_blog.controller;

import dev.samuelGJ.real_blog.model.Comment;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.request.CommentRequest;
import dev.samuelGJ.real_blog.payload.response.CommentResponseDto;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.security.CurrentUser;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.CommentService;
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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;

	@GetMapping
	public ResponseEntity<PagedResponse<CommentResponseDto>> getAllComments(@PathVariable(name = "postId") Long postId,
																 @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
																 @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {

		PagedResponse<CommentResponseDto> allComments = commentService.getAllComments(postId, page, size);

		return new ResponseEntity< >(allComments, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<CommentResponseDto> addComment(@Valid @RequestBody CommentRequest commentRequest,
			@PathVariable(name = "postId") Long postId, @RequestHeader("X-Anonymous-Name") String username) {
		CommentResponseDto newComment = commentService.addComment(commentRequest, postId, username);

		return new ResponseEntity<>(newComment, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<List<CommentResponseDto>> getComment(@PathVariable(name = "postId") Long postId,
															   @PathVariable(name = "id") Long id) {
		List<CommentResponseDto> commentResponseDtoList = commentService.getComment(postId, id);

		return new ResponseEntity<>(commentResponseDtoList, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Comment> updateComment(@PathVariable(name = "postId") Long postId,
			@PathVariable(name = "id") Long id, @Valid @RequestBody CommentRequest commentRequest,
			@RequestHeader("X-Anonymous-Name") String username) {

		Comment updatedComment = commentService.updateComment(postId, id, commentRequest, username);

		return new ResponseEntity<>(updatedComment, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteComment(@PathVariable(name = "postId") Long postId,
													 @PathVariable(name = "id") Long id,
													 @RequestHeader("X-Anonymous-Name") String username) {

		ApiResponse response = commentService.deleteComment(postId, id, username);

		HttpStatus status = response.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

		return new ResponseEntity<>(response, status);
	}

}
