package dev.samuelGJ.real_blog.service;


import dev.samuelGJ.real_blog.model.Album;
import dev.samuelGJ.real_blog.payload.response.AlbumResponse;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.request.AlbumRequest;
import dev.samuelGJ.real_blog.security.UserPrincipal;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface AlbumService {

	PagedResponse<AlbumResponse> getAllAlbums(int page, int size);

	ResponseEntity<AlbumResponse> addAlbum(AlbumRequest albumRequest, UserPrincipal currentUser);

	ResponseEntity<AlbumResponse> getAlbum(Long id);

	ResponseEntity<AlbumResponse> updateAlbum(Long id, List<MultipartFile> multipartFile, UserPrincipal currentUser);

	ResponseEntity<ApiResponse> deleteAlbum(Long id, UserPrincipal currentUser);

	PagedResponse<AlbumResponse> getUserAlbums(String username, int page, int size);

}
