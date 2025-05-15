package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.model.Post;
import dev.samuelGJ.real_blog.payload.ApiResponse;
import dev.samuelGJ.real_blog.payload.PagedResponse;
import dev.samuelGJ.real_blog.payload.PostRequest;
import dev.samuelGJ.real_blog.payload.PostResponse;
import dev.samuelGJ.real_blog.security.UserPrincipal;

/**
 * PostService interface
 */
public interface PostService {

    PagedResponse<Post> getAllPosts(int page, int size);

    PagedResponse<Post> getPostsByCreatedBy(String username, int page, int size);

    PagedResponse<Post> getPostsByCategory(Long id, int page, int size);

    PagedResponse<Post> getPostsByTag(Long id, int page, int size);

    Post updatePost(Long id, PostRequest newPostRequest, UserPrincipal currentUser);

    ApiResponse deletePost(Long id, UserPrincipal currentUser);

    PostResponse addPost(PostRequest postRequest, UserPrincipal currentUser);

    Post getPost(Long id);

}
