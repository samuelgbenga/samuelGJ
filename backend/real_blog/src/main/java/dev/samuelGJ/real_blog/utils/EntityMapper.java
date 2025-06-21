package dev.samuelGJ.real_blog.utils;

import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.model.Post;
import dev.samuelGJ.real_blog.model.Project;
import dev.samuelGJ.real_blog.model.Tag;
import dev.samuelGJ.real_blog.payload.UserSummary;
import dev.samuelGJ.real_blog.payload.request.ProjectRequest;
import dev.samuelGJ.real_blog.payload.response.PhotoResponse;
import dev.samuelGJ.real_blog.payload.response.PostResponseDto;
import dev.samuelGJ.real_blog.payload.response.ProjectResponseDto;
import dev.samuelGJ.real_blog.model.Certification;
import dev.samuelGJ.real_blog.payload.request.CertificationRequestDto;
import dev.samuelGJ.real_blog.payload.response.CertificationResponseDto;

import java.util.ArrayList;
import java.util.List;

public class EntityMapper {

    public static PostResponseDto mapToPostResponse(Post post) {
        return PostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .body(post.getBody())
                .authorId(post.getUser() != null ? post.getUser().getId() : null)
                .authorName(post.getUser() != null ? post.getUser().getFullName() : null)
                .categoryId(post.getCategory() != null ? post.getCategory().getId() : null)
                .categoryEnum(post.getCategory() != null ? post.getCategory().getCategoryEnum() : null)
                .postStatus(post.getPostStatus())
                .photo(post.getPhoto())
                .tagNames(post.getTags() != null
                        ? post.getTags().stream().map(Tag::getName).toList()
                        : List.of())
                .totalComments(post.getComments() != null ? post.getComments().size() : 0)
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    public static ProjectResponseDto entityToDto(Project entity) {
        if (entity == null) {
            return null;
        }

        ProjectResponseDto dto = new ProjectResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setLanguage(entity.getProgrammingLanguage());
        dto.setFrameworks(entity.getFrameworks() != null ? new ArrayList<>(entity.getFrameworks()) : new ArrayList<>());
        dto.setUrl(entity.getUrl());
        dto.setDescription(entity.getDescription());
        
        if (entity.getUser() != null) {
            UserSummary userSummary = new UserSummary(
                entity.getUser().getId(),
                entity.getUser().getUsername(),
                entity.getUser().getFirstName(),
                entity.getUser().getLastName()
            );
            dto.setUserSummary(userSummary);
        }

        return dto;
    }

    public static Project dtoToEntity(ProjectRequest dto) {
        if (dto == null) {
            return null;
        }

        Project entity = new Project();
        entity.setName(dto.name());
        entity.setProgrammingLanguage(dto.language());
        entity.setFrameworks(dto.frameworks() != null ? new ArrayList<>(dto.frameworks()) : new ArrayList<>());
        entity.setUrl(dto.url());
        entity.setDescription(dto.description());
        // Note: User is not set here as it should be set by the service layer
        // to maintain proper entity relationships and security

        return entity;
    }

    public static PhotoResponse fromPhotoToDto(Photo photo){
        PhotoResponse photoResponse = new PhotoResponse(photo.getId(), photo.getUrl(),
                photo.getThumbnailUrl());
        photoResponse.setCreatedBy(photo.getCreatedBy());
        photoResponse.setUpdatedBy(photo.getUpdatedBy());
        photoResponse.setCreatedAt(photo.getCreatedAt());
        photoResponse.setUpdatedAt(photo.getUpdatedAt());
        return photoResponse;
    }

    public static Certification dtoToEntity(CertificationRequestDto dto) {
        Certification certification = new Certification();
        certification.setName(dto.name());
        certification.setIssuer(dto.issuer());
        certification.setIssueDate(dto.issueDate());
        certification.setExpireDate(dto.expireDate());
        certification.setDescription(dto.description());
        return certification;
    }

    public static CertificationResponseDto entityToDto(Certification certification) {
        return new CertificationResponseDto(
            certification.getId(),
            certification.getName(),
            certification.getIssuer(),
            certification.getDescription(),
            certification.getIssueDate(),
            certification.getExpireDate(),
            certification.getCredentialUrl(),
            new UserSummary(certification.getUser().getId(), certification.getUser().getUsername(), certification.getUser().getFirstName(), certification.getUser().getLastName()),
            certification.getCreatedAt(),
            certification.getUpdatedAt()
        );
    }

}
