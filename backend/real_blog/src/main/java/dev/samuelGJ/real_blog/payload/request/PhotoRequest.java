package dev.samuelGJ.real_blog.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PhotoRequest {


	@NotBlank
	private String url;

	@NotBlank
	private String thumbnailUrl;

	@NotNull
	private Long albumId;
}
