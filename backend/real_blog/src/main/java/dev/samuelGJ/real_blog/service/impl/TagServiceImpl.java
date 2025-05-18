package dev.samuelGJ.real_blog.service.impl;

import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.model.Tag;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.payload.request.TagRequestDto;
import dev.samuelGJ.real_blog.payload.response.*;
import dev.samuelGJ.real_blog.repository.TagRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.TagService;
import dev.samuelGJ.real_blog.utils.AppUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {


	private final TagRepository tagRepository;

	private final ModelMapper modelMapper;

	@Override
	public PagedResponse<TagResponseDto> getAllTags(int page, int size) {
		AppUtils.validatePageNumberAndSize(page, size);

		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");

		Page<Tag> tags = tagRepository.findAll(pageable);

		List<Tag> content = tags.getNumberOfElements() == 0 ? Collections.emptyList() : tags.getContent();

		List<TagResponseDto> tagResponseDtoList = content.stream().map(this::fromTagToDto).toList();

		return new PagedResponse<>(tagResponseDtoList, tags.getNumber(), tags.getSize(), tags.getTotalElements(), tags.getTotalPages(), tags.isLast());
	}

	@Override
	public TagResponseDto getTag(Long id) {

			Tag tag =	tagRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tag"));

			return fromTagToDto(tag);
	}

	@Override
	public TagResponseDto addTag(TagRequestDto dto, UserPrincipal currentUser) {
		return fromTagToDto(tagRepository.save(new Tag(dto.name())));
	}

	@Override
	public TagResponseDto updateTag(Long id, TagRequestDto dto, UserPrincipal currentUser) {
		Tag tag = tagRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tag"));
		if (tag.getCreatedBy().equals(currentUser.getId()) || currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			tag.setName(dto.name());
			return fromTagToDto(tagRepository.save(tag));
		}

		throw new UnauthorizedException("You don't have permission to edit this tag");
	}

	@Override
	public ApiResponse deleteTag(Long id, UserPrincipal currentUser) {
		Tag tag = tagRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tag"));
		if (tag.getCreatedBy().equals(currentUser.getId()) || currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			tagRepository.deleteById(id);
			return new ApiResponse(Boolean.TRUE, "You successfully deleted tag");
		}

		throw new UnauthorizedException("You don't have permission to delete this tag");
	}

	private TagResponseDto fromTagToDto(Tag tag) {
		TagResponseDto dto = modelMapper.map(tag, TagResponseDto.class);

		List<PostResponseDto> postResponseDtoList = tag.getPosts()
				.stream()
				.map(post -> modelMapper.map(post, PostResponseDto.class))
				.toList();

		dto.setPostResponseDtoList(postResponseDtoList);

		return dto;
	}

}






















