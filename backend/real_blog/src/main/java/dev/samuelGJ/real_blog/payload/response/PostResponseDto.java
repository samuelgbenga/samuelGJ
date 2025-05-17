package dev.samuelGJ.real_blog.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
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

    private String authorName;        // From User
    private Long authorId;

    private String categoryName;      // From Category
    private Long categoryId;

    private List<String> tagNames;    // From Tags
    private int totalComments;        // From Comments

    private Instant createdAt;
    private Instant updatedAt;
}
