package dev.samuelGJ.real_blog.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import dev.samuelGJ.real_blog.enums.CategoryEnum;
import dev.samuelGJ.real_blog.enums.PostStatus;
import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.payload.UserDateAuditPayload;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.Instant;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class PostResponseDto extends UserDateAuditPayload {
    private Long id;
    private String title;
    private String body;

    private String description;

    private String authorName;        // From User
    private Long authorId;



    private CategoryEnum categoryEnum;      // From Category
    private Long categoryId;

    private PostStatus postStatus;

    private List<String> tagNames;    // From Tags
    private int totalComments;        // From Comments

    private Photo photo;

    private Instant createdAt;
    private Instant updatedAt;
}
