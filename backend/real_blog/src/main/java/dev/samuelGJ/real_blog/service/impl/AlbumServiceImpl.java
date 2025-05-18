package dev.samuelGJ.real_blog.service.impl;


import dev.samuelGJ.real_blog.exception.BlogApiException;
import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.model.Album;
import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.UserSummary;
import dev.samuelGJ.real_blog.payload.response.*;
import dev.samuelGJ.real_blog.payload.request.AlbumRequest;
import dev.samuelGJ.real_blog.repository.AlbumRepository;
import dev.samuelGJ.real_blog.repository.UserRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.AlbumService;
import dev.samuelGJ.real_blog.service.PhotoService;
import dev.samuelGJ.real_blog.utils.AppUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

import static dev.samuelGJ.real_blog.constant.AppConstants.ID;


@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {
	private static final String CREATED_AT = "createdAt";

	private static final String ALBUM_STR = "Album";

	private static final String YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION = "You don't have permission to make this operation";


	private final AlbumRepository albumRepository;


	private final UserRepository userRepository;


	private final ModelMapper modelMapper;

	private final PhotoService photoService;

	@Override
	public PagedResponse<AlbumResponse> getAllAlbums(int page, int size) {
		AppUtils.validatePageNumberAndSize(page, size);

		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, CREATED_AT);

		Page<Album> albums = albumRepository.findAll(pageable);

		if (albums.getNumberOfElements() == 0) {
			return new PagedResponse<>(Collections.emptyList(), albums.getNumber(), albums.getSize(), albums.getTotalElements(),
					albums.getTotalPages(), albums.isLast());
		}

		List<AlbumResponse> albumResponses = List.of(albums.getContent().stream().map(this::mapToAlbumResponse).toArray(AlbumResponse[]::new));

		return new PagedResponse<>(albumResponses, albums.getNumber(), albums.getSize(), albums.getTotalElements(), albums.getTotalPages(),
				albums.isLast());
	}

	@Override
	public ResponseEntity<AlbumResponse> addAlbum(AlbumRequest albumRequest, UserPrincipal currentUser) {
		User user = userRepository.getUser(currentUser);

		Album album = new Album();

		album.setTitle(albumRequest.getTitle());

		album.setUser(user);

		 List<Photo> photos = albumRequest.getMultipartFiles().stream().map(multipartFile -> photoService.addPhoto(multipartFile)).toList();

		 album.setPhoto(photos);

		AlbumResponse response = mapToAlbumResponse(albumRepository.save(album));

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<AlbumResponse> getAlbum(Long id) {
		Album album = albumRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ALBUM_STR));

		AlbumResponse albumResponse = modelMapper.map(album, AlbumResponse.class);
		albumResponse.setUserSummary(modelMapper.map(album.getUser(), UserSummary.class));

		return new ResponseEntity<>(albumResponse, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<AlbumResponse> updateAlbum(Long id, AlbumRequest newAlbum, UserPrincipal currentUser) {
		Album album = albumRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ALBUM_STR));
		User user = userRepository.getUser(currentUser);
		if (album.getUser().getId().equals(user.getId()) || currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			album.setTitle(newAlbum.getTitle());

			// todo: add more photos to album
			Album updatedAlbum = albumRepository.save(album);

			AlbumResponse albumResponse = new AlbumResponse();

			modelMapper.map(updatedAlbum, albumResponse);

			return new ResponseEntity<>(albumResponse, HttpStatus.OK);
		}

		throw new BlogApiException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public ResponseEntity<ApiResponse> deleteAlbum(Long id, UserPrincipal currentUser) {
		Album album = albumRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ALBUM_STR));
		User user = userRepository.getUser(currentUser);
		if (album.getUser().getId().equals(user.getId()) || currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			albumRepository.deleteById(id);
			return new ResponseEntity<>(new ApiResponse(Boolean.TRUE, "You successfully deleted album"), HttpStatus.OK);
		}

		throw new BlogApiException( YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public PagedResponse<AlbumResponse> getUserAlbums(String username, int page, int size) {
		User user = userRepository.getUserByName(username);

		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, CREATED_AT);

		Page<Album> albums = albumRepository.findByCreatedBy(user.getId(), pageable);

		List<AlbumResponse> content = albums.getNumberOfElements() > 0
				? albums.getContent().stream().map(this::mapToAlbumResponse).toList()
				: Collections.emptyList();

		return new PagedResponse<>(content, albums.getNumber(), albums.getSize(), albums.getTotalElements(), albums.getTotalPages(), albums.isLast());
	}

	// todo: add more photos to album

	private AlbumResponse mapToAlbumResponse(Album album){
		AlbumResponse albumResponse = modelMapper.map(album, AlbumResponse.class);
		albumResponse.setUserSummary(modelMapper.map(album.getUser(), UserSummary.class));

		List<PhotoResponse> photosDto = album.getPhoto()
				.stream()
				.map(photo -> modelMapper.map(photo, PhotoResponse.class))
				.toList();

		albumResponse.setPhotoResponseList(photosDto);

		return albumResponse;
	}
}
