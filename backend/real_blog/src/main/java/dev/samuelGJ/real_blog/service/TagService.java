package dev.samuelGJ.real_blog.service;


import dev.samuelGJ.real_blog.payload.request.TagRequestDto;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.response.TagResponseDto;
import dev.samuelGJ.real_blog.security.UserPrincipal;

public interface TagService {

	PagedResponse<TagResponseDto> getAllTags(int page, int size);

	TagResponseDto getTag(Long id);

	TagResponseDto addTag(TagRequestDto dto, UserPrincipal currentUser);

	TagResponseDto updateTag(Long id, TagRequestDto dto, UserPrincipal currentUser);

	ApiResponse deleteTag(Long id, UserPrincipal currentUser);

}
