package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.payload.request.CategoryRequestDto;
import dev.samuelGJ.real_blog.payload.response.CategoryResponseDto;
import org.springframework.http.ResponseEntity;
import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.security.UserPrincipal;

public interface CategoryService {

	PagedResponse<CategoryResponseDto> getAllCategories(int page, int size);

	ResponseEntity<CategoryResponseDto> getCategory(Long id);

	ResponseEntity<CategoryResponseDto> addCategory(CategoryRequestDto dto, UserPrincipal currentUser);

	ResponseEntity<CategoryResponseDto> updateCategory(Long id, CategoryRequestDto dto, UserPrincipal currentUser)
			throws UnauthorizedException;

	ResponseEntity<ApiResponse> deleteCategory(Long id, UserPrincipal currentUser) throws UnauthorizedException;

}
