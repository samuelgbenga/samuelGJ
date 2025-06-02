package dev.samuelGJ.real_blog.controller;

import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.model.Category;
import dev.samuelGJ.real_blog.payload.request.CategoryRequestDto;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.CategoryResponseDto;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.security.CurrentUser;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.CategoryService;
import dev.samuelGJ.real_blog.constant.AppConstants;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping
	public PagedResponse<CategoryResponseDto> getAllCategories(
			@RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
			@RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {
		return categoryService.getAllCategories(page, size);
	}

	@PostMapping
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<CategoryResponseDto> addCategory(@Valid @RequestBody CategoryRequestDto dto,
			@CurrentUser UserPrincipal currentUser) {

		return categoryService.addCategory(dto, currentUser);
	}

	@GetMapping("/{id}")
	public ResponseEntity<CategoryResponseDto> getCategory(@PathVariable(name = "id") Long id) {
		return categoryService.getCategory(id);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<CategoryResponseDto> updateCategory(@PathVariable(name = "id") Long id,
			@Valid @RequestBody CategoryRequestDto category, @CurrentUser UserPrincipal currentUser) {
		return categoryService.updateCategory(id, category, currentUser);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deleteCategory(@PathVariable(name = "id") Long id,
													  @CurrentUser UserPrincipal currentUser)  {
		return categoryService.deleteCategory(id, currentUser);
	}

}
