package dev.samuelGJ.real_blog.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class CommentRequest {
	@NotBlank
	@Size(min = 1, message = "Comment body must be minimum 1 characters")
	private String body;

	private Long parentId;

}
