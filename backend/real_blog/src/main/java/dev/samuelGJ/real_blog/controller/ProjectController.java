package dev.samuelGJ.real_blog.controller;

import dev.samuelGJ.real_blog.model.Project;
import dev.samuelGJ.real_blog.payload.request.ProjectRequest;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.response.ProjectResponseDto;
import dev.samuelGJ.real_blog.security.CurrentUser;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.ProjectService;
import dev.samuelGJ.real_blog.constant.AppConstants;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {


	private final ProjectService service;

	@GetMapping
	//@PreAuthorize("hasRole('USER')")
	public ResponseEntity<PagedResponse<ProjectResponseDto>> getAll(
			@CurrentUser UserPrincipal currentUser,
			@RequestParam(value = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
			@RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {

		PagedResponse<ProjectResponseDto> response = service.getAll(currentUser, page, size);

		return new ResponseEntity< >(response, HttpStatus.OK);
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ProjectResponseDto> create(@Valid @RequestBody ProjectRequest request, @CurrentUser UserPrincipal currentUser) {
		ProjectResponseDto project = service.create(request, currentUser);
		return new ResponseEntity<>(project, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	//@PreAuthorize("hasRole('USER')")
	public ResponseEntity<ProjectResponseDto> get(@PathVariable(value = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		ProjectResponseDto project = service.get(id, currentUser);
		return new ResponseEntity<>(project, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ProjectResponseDto> update(@PathVariable(value = "id") Long id, @Valid @RequestBody ProjectRequest request,
			@CurrentUser UserPrincipal currentUser) {
		ProjectResponseDto project = service.update(id, request, currentUser);
		return new ResponseEntity<>(project, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> delete(@PathVariable(value = "id") Long id, @CurrentUser UserPrincipal currentUser) {
		ApiResponse apiResponse = service.delete(id, currentUser);

		return new ResponseEntity<>(apiResponse, HttpStatus.OK);
	}

}
