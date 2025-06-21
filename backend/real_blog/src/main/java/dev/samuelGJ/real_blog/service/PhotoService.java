package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.request.PhotoRequest;
import dev.samuelGJ.real_blog.payload.response.PhotoResponse;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import org.springframework.web.multipart.MultipartFile;

public interface PhotoService {

	PagedResponse<PhotoResponse> getAllPhotos(int page, int size);

	PhotoResponse getPhoto(String id);

	PhotoResponse updatePhoto(String id, PhotoRequest photoRequest, UserPrincipal currentUser);

	PhotoResponse addPhoto(PhotoRequest photoRequest, UserPrincipal currentUser);

	Photo addPhoto(MultipartFile multipartFile);

	ApiResponse deletePhoto(String id, UserPrincipal currentUser);

	PhotoResponse createPhoto(MultipartFile multipartFile);


}