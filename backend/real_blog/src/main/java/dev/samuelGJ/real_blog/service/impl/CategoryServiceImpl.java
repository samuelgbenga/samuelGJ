package dev.samuelGJ.real_blog.service.impl;

import dev.samuelGJ.real_blog.enums.CategoryEnum;
import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.model.Category;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.payload.request.CategoryRequestDto;
import dev.samuelGJ.real_blog.payload.response.*;
import dev.samuelGJ.real_blog.repository.CategoryRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.CategoryService;
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

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository categoryRepository;

	private final ModelMapper modelMapper;

	@Override
	public PagedResponse<CategoryResponseDto> getAllCategories(int page, int size) {
		AppUtils.validatePageNumberAndSize(page, size);

		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");

		Page<Category> categories = categoryRepository.findAll(pageable);

		List<CategoryResponseDto> content = categories.getNumberOfElements() == 0 ? Collections.emptyList() : categories.getContent().stream().map(this::fromCategoryToDto).toList();

		return new PagedResponse<>(content, categories.getNumber(), categories.getSize(), categories.getTotalElements(),
				categories.getTotalPages(), categories.isLast());
	}

	@Override
	public ResponseEntity<CategoryResponseDto> getCategory(Long id) {
		Category category = getCategoryById(id);

		return new ResponseEntity<>(fromCategoryToDto(category), HttpStatus.OK);
	}


	@Override
	public Category getCategoryById(Long id) {
		Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category Not Found"));

		return category;
	}



	@Override
	public ResponseEntity<CategoryResponseDto> getCategory( CategoryEnum categoryEnum) {
		Category category = getCategoryByEnum(categoryEnum);

		return new ResponseEntity<>(fromCategoryToDto(category), HttpStatus.OK);
	}

	@Override
	public Category getCategoryByEnum( CategoryEnum categoryEnum) {
		Category category = categoryRepository.findByCategoryEnum(categoryEnum).orElseThrow(() -> new ResourceNotFoundException("Category Not Found"));

		return category;
	}

	@Override
	public ResponseEntity<CategoryResponseDto> addCategory(CategoryRequestDto dto, UserPrincipal currentUser) {
		Category category = new Category();
		category.setCategoryEnum(dto.categoryEnum());
		Category newCategory = categoryRepository.save(category);
		return new ResponseEntity<>(fromCategoryToDto(newCategory), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<CategoryResponseDto> updateCategory(Long id, CategoryRequestDto dto, UserPrincipal currentUser) {
		Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category Not Found"));
		if (category.getCreatedBy().equals(currentUser.getId()) || currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			category.setCategoryEnum(dto.categoryEnum());
			Category updatedCategory = categoryRepository.save(category);
			return new ResponseEntity<>(fromCategoryToDto(updatedCategory), HttpStatus.OK);
		}

		throw new UnauthorizedException("You don't have permission to edit this category");
	}

	@Override
	public ResponseEntity<ApiResponse> deleteCategory(Long id, UserPrincipal currentUser) {
		Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("category Not found"));
		if (category.getCreatedBy().equals(currentUser.getId()) || currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			categoryRepository.deleteById(id);
			return new ResponseEntity<>(new ApiResponse(Boolean.TRUE, "You successfully deleted category"), HttpStatus.OK);
		}
		throw new UnauthorizedException("You don't have permission to delete this category");
	}


	private CategoryResponseDto fromCategoryToDto(Category category) {
		CategoryResponseDto dto = modelMapper.map(category, CategoryResponseDto.class);

		List<PostResponseDto> postDtos = category.getPosts()
				.stream()
				.map(post -> modelMapper.map(post, PostResponseDto.class))
				.toList();

		dto.setPostsResponseDtoList(postDtos);

		return dto;
	}
}






















