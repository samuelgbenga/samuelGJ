package dev.samuelGJ.real_blog.service;

import org.springframework.http.ResponseEntity;
import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.model.Category;
import dev.samuelGJ.real_blog.payload.ApiResponse;
import dev.samuelGJ.real_blog.payload.PagedResponse;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
public interface CategoryService {

	PagedResponse<Category> getAllCategories(int page, int size);

	ResponseEntity<Category> getCategory(Long id);

	ResponseEntity<Category> addCategory(Category category, UserPrincipal currentUser);

	ResponseEntity<Category> updateCategory(Long id, Category newCategory, UserPrincipal currentUser)
			throws UnauthorizedException;

	ResponseEntity<ApiResponse> deleteCategory(Long id, UserPrincipal currentUser) throws UnauthorizedException;

}
