package dev.samuelGJ.real_blog.service;


import dev.samuelGJ.real_blog.model.Album;
import dev.samuelGJ.real_blog.payload.AlbumResponse;
import dev.samuelGJ.real_blog.payload.ApiResponse;
import dev.samuelGJ.real_blog.payload.PagedResponse;
import dev.samuelGJ.real_blog.payload.request.AlbumRequest;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

public interface AlbumService {

	PagedResponse<AlbumResponse> getAllAlbums(int page, int size);

	ResponseEntity<Album> addAlbum(AlbumRequest albumRequest, UserPrincipal currentUser);

	ResponseEntity<Album> getAlbum(Long id);

	ResponseEntity<AlbumResponse> updateAlbum(Long id, AlbumRequest newAlbum, UserPrincipal currentUser);

	ResponseEntity<ApiResponse> deleteAlbum(Long id, UserPrincipal currentUser);

	PagedResponse<Album> getUserAlbums(String username, int page, int size);

}
