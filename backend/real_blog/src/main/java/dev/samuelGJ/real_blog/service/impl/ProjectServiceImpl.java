package dev.samuelGJ.real_blog.service.impl;

import dev.samuelGJ.real_blog.exception.BadRequestException;
import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.model.Project;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.UserSummary;
import dev.samuelGJ.real_blog.payload.request.ProjectRequest;
import dev.samuelGJ.real_blog.payload.response.*;
import dev.samuelGJ.real_blog.repository.ProjectRepository;
import dev.samuelGJ.real_blog.repository.UserRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.ProjectService;
import dev.samuelGJ.real_blog.utils.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public ProjectResponseDto create(ProjectRequest request, UserPrincipal currentUser) {
        User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User Not found"));
        
        Project project = EntityMapper.dtoToEntity(request);
		project.setUser(user);
        Project savedProject = projectRepository.save(project);
        return EntityMapper.entityToDto(savedProject);
    }

    @Override
    public ProjectResponseDto get(Long id, UserPrincipal currentUser) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Projec Not Found"));
        return EntityMapper.entityToDto(project);
    }

    @Override
    public PagedResponse<ProjectResponseDto> getAll(UserPrincipal currentUser, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Project> projects = projectRepository.findByCreatedBy(currentUser.getId(), pageable);
        return new PagedResponse<>(projects.getContent().stream()
            .map(EntityMapper::entityToDto)
            .toList(), projects.getNumber(), projects.getSize(), projects.getTotalElements(),
            projects.getTotalPages(), projects.isLast());
    }

    @Override
    public ProjectResponseDto update(Long id, ProjectRequest request, UserPrincipal currentUser) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project Not Found"));
        
        if (!project.getCreatedBy().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this project");
        }

        project.setName(request.name() != null || !request.name().isEmpty() ? request.name() : project.getName());
        project.setProgrammingLanguage(request.language());
        project.setFrameworks(request.frameworks().isEmpty() ? project.getFrameworks() : request.frameworks());
        project.setUrl(request.url() != null || !request.url().isEmpty() ? request.url() : project.getUrl());
        project.setDescription(request.description() != null || !request.description().isEmpty() ? request.description() : project.getDescription());

        Project updatedProject = projectRepository.save(project);
        return EntityMapper.entityToDto(updatedProject);
    }

    @Override
    public ApiResponse delete(Long id, UserPrincipal currentUser) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project Not Found"));
        
        if (!project.getCreatedBy().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to delete this project");
        }

        projectRepository.delete(project);
        return new ApiResponse(true, "Project deleted successfully");
    }
}
