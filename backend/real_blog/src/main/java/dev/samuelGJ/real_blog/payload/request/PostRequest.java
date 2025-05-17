package dev.samuelGJ.real_blog.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
public class PostRequest {

	@NotBlank
	@Size(min = 5)
	private String title;

	@NotBlank
	@Size(min = 50)
	private String body;

	@NotNull
	private Long categoryId;

	private List<String> tags;

}
