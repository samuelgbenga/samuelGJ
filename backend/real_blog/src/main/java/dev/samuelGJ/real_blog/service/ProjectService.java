package dev.samuelGJ.real_blog.service;


import dev.samuelGJ.real_blog.payload.request.ProjectRequest;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.response.ProjectResponseDto;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {

	ProjectResponseDto create(ProjectRequest request, UserPrincipal currentUser);

	ProjectResponseDto get(Long id, UserPrincipal currentUser);

	PagedResponse<ProjectResponseDto> getAll(int page, int size);

	ProjectResponseDto update(Long id, ProjectRequest dto, UserPrincipal currentUser);

	ApiResponse delete(Long id, UserPrincipal currentUser);

	ApiResponse deleteProjectPhoto(Long projectId, String photoId, UserPrincipal currentUser);

	ProjectResponseDto addPhotosToProject(Long projectId, List<MultipartFile> multipartFiles, UserPrincipal currentUser);

}
