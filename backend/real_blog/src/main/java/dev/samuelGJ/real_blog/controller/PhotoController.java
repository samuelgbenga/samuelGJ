package dev.samuelGJ.real_blog.controller;

import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.request.PhotoRequest;
import dev.samuelGJ.real_blog.payload.response.PhotoResponse;
import dev.samuelGJ.real_blog.security.CurrentUser;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.PhotoService;
import dev.samuelGJ.real_blog.constant.AppConstants;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/v1/photos")
@RequiredArgsConstructor
public class PhotoController {

	private final PhotoService photoService;

	@GetMapping
	public PagedResponse<PhotoResponse> getAllPhotos(
			@RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
			@RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {
		return photoService.getAllPhotos(page, size);
	}

	@PostMapping("/will_be_removed")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<PhotoResponse> addPhoto(@Valid @RequestBody PhotoRequest photoRequest,
			@CurrentUser UserPrincipal currentUser) {
		PhotoResponse photoResponse = photoService.addPhoto(photoRequest, currentUser);

		return new ResponseEntity< >(photoResponse, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<PhotoResponse> getPhoto(@PathVariable(name = "id") String id) {
		PhotoResponse photoResponse = photoService.getPhoto(id);

		return new ResponseEntity< >(photoResponse, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<PhotoResponse> updatePhoto(@PathVariable(name = "id") String id,
			@Valid @RequestBody PhotoRequest photoRequest, @CurrentUser UserPrincipal currentUser) {

		PhotoResponse photoResponse = photoService.updatePhoto(id, photoRequest, currentUser);

		return new ResponseEntity< >(photoResponse, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deletePhoto(@PathVariable(name = "id") String id, @CurrentUser UserPrincipal currentUser) {
		ApiResponse apiResponse = photoService.deletePhoto(id, currentUser);

		return new ResponseEntity< >(apiResponse, HttpStatus.OK);
	}


	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PhotoResponse> updateAlbum(
            @RequestPart("multipartFiles") MultipartFile multipartFiles,
            @CurrentUser UserPrincipal currentUser) {
				PhotoResponse photoResponse = photoService.createPhoto(multipartFiles);
        return ResponseEntity.ok(photoResponse) ;
    }
}
