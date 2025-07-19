package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.model.Comment;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.request.CommentRequest;
import dev.samuelGJ.real_blog.payload.response.CommentResponseDto;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;

import java.util.List;

/**
 * Comment Service interface
 */
public interface CommentService {

    PagedResponse<CommentResponseDto> getAllComments(Long postId, int page, int size);

    CommentResponseDto addComment(CommentRequest commentRequest, Long postId, String username);

    List<CommentResponseDto> getComment(Long postId, Long id);

    Comment updateComment(Long postId, Long id, CommentRequest commentRequest, String username);

    ApiResponse deleteComment(Long postId, Long id, String username);

}
