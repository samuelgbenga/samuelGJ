package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.model.Comment;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.request.CommentRequest;
import dev.samuelGJ.real_blog.payload.response.CommentResponseDto;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.security.UserPrincipal;

import java.util.List;

/**
 * Comment Service interface
 */
public interface CommentService {

    PagedResponse<CommentResponseDto> getAllComments(Long postId, int page, int size);

    CommentResponseDto addComment(CommentRequest commentRequest, Long postId, UserPrincipal currentUser);

    List<CommentResponseDto> getComment(Long postId, Long id);

    Comment updateComment(Long postId, Long id, CommentRequest commentRequest, UserPrincipal currentUser);

    ApiResponse deleteComment(Long postId, Long id, UserPrincipal currentUser);

}
