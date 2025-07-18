package dev.samuelGJ.real_blog.service.impl;

import dev.samuelGJ.real_blog.exception.BadRequestException;
import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.model.Category;
import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.model.Post;
import dev.samuelGJ.real_blog.model.Tag;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.request.PostRequest;
import dev.samuelGJ.real_blog.payload.request.PostUpdateRequest;
import dev.samuelGJ.real_blog.payload.response.PostResponseDto;
import dev.samuelGJ.real_blog.repository.CategoryRepository;
import dev.samuelGJ.real_blog.repository.PostRepository;
import dev.samuelGJ.real_blog.repository.TagRepository;
import dev.samuelGJ.real_blog.repository.UserRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.CategoryService;
import dev.samuelGJ.real_blog.service.ClapService;
import dev.samuelGJ.real_blog.service.PhotoService;
import dev.samuelGJ.real_blog.service.PostService;
import dev.samuelGJ.real_blog.constant.AppConstants;
import dev.samuelGJ.real_blog.utils.EntityMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static dev.samuelGJ.real_blog.constant.AppConstants.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {

	private final PostRepository postRepository;
	private final UserRepository userRepository;
	private final TagRepository tagRepository;
	private final CategoryService categoryService;
	private final PhotoService photoService;
	private final ClapService clapService;

	@Override
	public PagedResponse<PostResponseDto> getAllPosts(int page, int size) {
		validatePageNumberAndSize(page, size);
		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, CREATED_AT);
		Page<Post> posts = postRepository.findAll(pageable);
		List<PostResponseDto> content = posts.isEmpty()
				? Collections.emptyList()
				: getPostResponseList(posts);
		
		return new PagedResponse<>(content, posts.getNumber(), posts.getSize(),
				posts.getTotalElements(), posts.getTotalPages(), posts.isLast());
	}

	@Override
	public PagedResponse<PostResponseDto> getPostsByCreatedBy(String username, int page, int size) {
		validatePageNumberAndSize(page, size);
		User user = userRepository.getUserByName(username);
		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, CREATED_AT);
		Page<Post> posts = postRepository.findByCreatedBy(user.getId(), pageable);
		List<PostResponseDto> content = posts.getNumberOfElements() == 0 ? Collections.emptyList() : getPostResponseList(posts);

		return new PagedResponse<>(content, posts.getNumber(), posts.getSize(), posts.getTotalElements(),
				posts.getTotalPages(), posts.isLast());
	}

	@Override
	public PagedResponse<PostResponseDto> getPostsByCategory(Long id, int page, int size) {
		validatePageNumberAndSize(page, size);
		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, CREATED_AT);
		Page<Post> posts = postRepository.findByCategory(id, pageable);
		List<PostResponseDto> content = posts.isEmpty() ? Collections.emptyList() : getPostResponseList(posts);

		return new PagedResponse<>(content, posts.getNumber(), posts.getSize(), posts.getTotalElements(),
				posts.getTotalPages(), posts.isLast());
	}

	@Override
	public PagedResponse<PostResponseDto> getPostsByTag(Long tagId, int page, int size) {
		validatePageNumberAndSize(page, size);
		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, CREATED_AT);
		Page<Post> posts = postRepository.findByTagsId(tagId, pageable);
		List<PostResponseDto> content = posts.getNumberOfElements() == 0 ? Collections.emptyList() : getPostResponseList(posts);
		return new PagedResponse<>(content, posts.getNumber(), posts.getSize(), posts.getTotalElements(),
				posts.getTotalPages(), posts.isLast());
	}

	@Override
	public PostResponseDto updatePost(Long id, PostUpdateRequest newPostRequest, UserPrincipal currentUser) {
		Post post = postRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(POST));

		if (!post.getUser().getId().equals(currentUser.getId()) &&
				!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.name()))) {
			throw new UnauthorizedException("You don't have permission to edit this post");
		}

		// Update category if provided
		if (newPostRequest.getCategoryEnum() != null) {
			Category category = categoryService.getCategoryByEnum(newPostRequest.getCategoryEnum());
			post.setCategory(category);
		}

		// Update tags if provided
		if (newPostRequest.getTags() != null && !newPostRequest.getTags().isEmpty()) {
			List<Tag> tags = newPostRequest.getTags().stream()
				.map(tagName -> {
					Tag tag = tagRepository.findByName(tagName);
					return tag != null ? tag : tagRepository.save(new Tag(tagName));
				})
				.collect(Collectors.toList());
			post.setTags(tags);
		}

		// Update basic fields if provided
		if (newPostRequest.getTitle() != null && !newPostRequest.getTitle().trim().isEmpty()) {
			post.setTitle(newPostRequest.getTitle());
		}
		if (newPostRequest.getBody() != null && !newPostRequest.getBody().trim().isEmpty()) {
			post.setBody(newPostRequest.getBody());
		}
		if (newPostRequest.getDescription() != null && !newPostRequest.getDescription().trim().isEmpty()) {
			post.setDescription(newPostRequest.getDescription());
		}
		if (newPostRequest.getPostStatus() != null) {
			post.setPostStatus(newPostRequest.getPostStatus());
		}

		Post updated = postRepository.save(post);
		return mapToDto(updated);
	}

	@Override
	public PostResponseDto updatePostPhoto(Long postId, MultipartFile photoFile, UserPrincipal currentUser) {
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException(POST));

		if (!post.getUser().getId().equals(currentUser.getId()) &&
				!currentUser.getAuthorities().contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.name()))) {
			throw new UnauthorizedException("You don't have permission to edit this post's photo");
		}

		if (photoFile != null && !photoFile.isEmpty()) {
			// Delete the old photo if it exists
			if (post.getPhoto() != null && post.getPhoto().getId() != null) {
				photoService.deletePhoto(post.getPhoto().getId(), currentUser);
			}

			Photo newPhoto = photoService.addPhoto(photoFile);
			post.setPhoto(newPhoto);
		}

		Post updatedPost = postRepository.save(post);
		return mapToDto(updatedPost);
	}

	@Override
	public ApiResponse deletePost(Long id, UserPrincipal currentUser) {
		Post post = postRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(POST));

		if (post.getUser().getId().equals(currentUser.getId()) ||
				currentUser.getAuthorities().contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.name()))) {
			postRepository.deleteById(id);
			return new ApiResponse(true, "You successfully deleted post");
		}

		throw new UnauthorizedException( "You don't have permission to delete this post");
	}

	@Override
	public PostResponseDto addPost(PostRequest postRequest, UserPrincipal currentUser) {
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException(USER));

		Category category = categoryService.getCategoryByEnum(postRequest.getCategoryEnum());

		List<Tag> tags = postRequest.getTags().stream()
				.map(tagName -> {
					Tag tag = tagRepository.findByName(tagName);
					return tag != null ? tag : tagRepository.save(new Tag(tagName));
				})
				.collect(Collectors.toList());

		Post post = new Post();
		post.setTitle(postRequest.getTitle());
		post.setBody(postRequest.getBody());
		post.setUser(user);
		post.setDescription(postRequest.getDescription());
		post.setCategory(category);
		post.setPostStatus(postRequest.getPostStatus());
		post.setTags(tags);

		Photo photo = photoService.addPhoto(postRequest.getMultipartFile());
		post.setPhoto(photo);

		Post savedPost = postRepository.save(post);
		return mapToDto(savedPost);
	}

	@Override
	public PostResponseDto getPost(Long id) {
		Post post = postRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(POST));
		return mapToDto(post);
	}

	private void validatePageNumberAndSize(int page, int size) {
		if (page < 0) throw new BadRequestException("Page number cannot be less than zero.");
		if (size < 0) throw new BadRequestException("Size number cannot be less than zero.");
		if (size > AppConstants.MAX_PAGE_SIZE) {
			throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
		}
	}

	private PostResponseDto mapToDto(Post post) {
		PostResponseDto dto = EntityMapper.mapToPostResponse(post);

		dto.setClaps(clapService.getTotalClapsByPostId(post.getId()));

		return dto;
	}


	private List<PostResponseDto> getPostResponseList(Page<Post> posts) {
		List<PostResponseDto> content = new ArrayList<>();
		if (!posts.isEmpty()) {
			for (Post post : posts.getContent()) {
				PostResponseDto dto = mapToDto(post);
				// Add additional logic here, e.g.:
				 int totalClaps = clapService.getTotalClapsByPostId(post.getId());
				 dto.setClaps(totalClaps);
				content.add(dto);
			}
		}
		return content;
	}
}


