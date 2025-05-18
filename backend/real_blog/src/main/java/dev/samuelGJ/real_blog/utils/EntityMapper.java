package dev.samuelGJ.real_blog.utils;

import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.model.Post;
import dev.samuelGJ.real_blog.model.Tag;
import dev.samuelGJ.real_blog.payload.response.PhotoResponse;
import dev.samuelGJ.real_blog.payload.response.PostResponseDto;

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
                .categoryName(post.getCategory() != null ? post.getCategory().getName() : null)
                .tagNames(post.getTags() != null
                        ? post.getTags().stream().map(Tag::getName).toList()
                        : List.of())
                .totalComments(post.getComments() != null ? post.getComments().size() : 0)
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
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



}
