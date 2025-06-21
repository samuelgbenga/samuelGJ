package dev.samuelGJ.real_blog.service.impl;


import dev.samuelGJ.real_blog.exception.BlogApiException;
import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.model.Album;
import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.request.PhotoRequest;
import dev.samuelGJ.real_blog.payload.response.PhotoResponse;
import dev.samuelGJ.real_blog.repository.AlbumRepository;
import dev.samuelGJ.real_blog.repository.PhotoRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.CloudinaryService;
import dev.samuelGJ.real_blog.service.PhotoService;
import dev.samuelGJ.real_blog.constant.AppConstants;
import dev.samuelGJ.real_blog.utils.AppUtils;
import dev.samuelGJ.real_blog.utils.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static dev.samuelGJ.real_blog.constant.AppConstants.*;


@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {


	private final PhotoRepository photoRepository;

	private final CloudinaryService cloudinaryService;


	@Override
	public PagedResponse<PhotoResponse> getAllPhotos(int page, int size) {
		AppUtils.validatePageNumberAndSize(page, size);

		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, CREATED_AT);
		Page<Photo> photos = photoRepository.findAll(pageable);

		List<PhotoResponse> photoResponses = new ArrayList<>(photos.getContent().size());
		for (Photo photo : photos.getContent()) {
			photoResponses.add(EntityMapper.fromPhotoToDto(photo));
		}

		if (photos.getNumberOfElements() == 0) {
			return new PagedResponse<>(Collections.emptyList(), photos.getNumber(), photos.getSize(),
					photos.getTotalElements(), photos.getTotalPages(), photos.isLast());
		}
		return new PagedResponse<>(photoResponses, photos.getNumber(), photos.getSize(), photos.getTotalElements(),
				photos.getTotalPages(), photos.isLast());

	}

	@Override
	public PhotoResponse getPhoto(String id) {
		Photo photo = photoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(PHOTO));

		return fromPhotoToDto(photo);
	}

	@Override
	public PhotoResponse updatePhoto(String id, PhotoRequest photoRequest, UserPrincipal currentUser) {

	return null;

	}

	@Override
	public PhotoResponse addPhoto(PhotoRequest photoRequest, UserPrincipal currentUser) {

			Photo photo = new Photo( photoRequest.url(), photoRequest.thumbnailUrl()
					);
			Photo newPhoto = photoRepository.save(photo);
			return fromPhotoToDto(newPhoto);

	}

	@Override
	public Photo addPhoto(MultipartFile multipartFile) {
		Photo photo = cloudinaryService(multipartFile);
		Photo newPhoto = photoRepository.save(photo);
		return newPhoto;

	}

	@Override
	public PhotoResponse createPhoto(MultipartFile multipartFile){
		 return fromPhotoToDto(addPhoto(multipartFile));
	}

	@Override
	public ApiResponse deletePhoto(String id, UserPrincipal currentUser) {

		if (photoRepository.existsById(id) || currentUser.getAuthorities().contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			photoRepository.deleteById(id);
			return new ApiResponse(Boolean.TRUE, "Photo deleted successfully");
		}

		throw new UnauthorizedException("You don't have permission to delete this photo");
	}


	private PhotoResponse fromPhotoToDto(Photo photo){
		return new PhotoResponse(photo.getId(), photo.getUrl(),
				photo.getThumbnailUrl());
	}

	private Photo fromDtoToPhoto(PhotoResponse photo){
		return new Photo(photo.getId(), photo.getUrl(),
				photo.getThumbnailUrl());
	}

	private Photo cloudinaryService(MultipartFile multipartFile) {
		PhotoResponse photoResponse = cloudinaryService.uploadFile(multipartFile);
		if (photoResponse == null) {
			throw new BlogApiException("Failed to upload file to Cloudinary");
		}
		return fromDtoToPhoto(photoResponse);
	}
}
