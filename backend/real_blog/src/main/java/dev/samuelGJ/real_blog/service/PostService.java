package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.model.Post;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.request.PostRequest;
import dev.samuelGJ.real_blog.payload.response.PostResponseDto;
import dev.samuelGJ.real_blog.security.UserPrincipal;

/**
 * PostService interface
 */
public interface PostService {

    PagedResponse<PostResponseDto> getAllPosts(int page, int size);

    PagedResponse<PostResponseDto> getPostsByCreatedBy(String username, int page, int size);

    PagedResponse<PostResponseDto> getPostsByCategory(Long id, int page, int size);

    PagedResponse<PostResponseDto> getPostsByTag(Long id, int page, int size);

    PostResponseDto updatePost(Long id, PostRequest newPostRequest, UserPrincipal currentUser);

    ApiResponse deletePost(Long id, UserPrincipal currentUser);

    PostResponseDto addPost(PostRequest postRequest, UserPrincipal currentUser);

    PostResponseDto getPost(Long id);

}
