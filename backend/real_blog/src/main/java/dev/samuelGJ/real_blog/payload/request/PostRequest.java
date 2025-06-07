package dev.samuelGJ.real_blog.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import dev.samuelGJ.real_blog.enums.CategoryEnum;

@Data
public class PostRequest {

	@NotBlank
	@Size(min = 5)
	private String title;

	@NotBlank
	@Size(min = 50)
	private String body;

	private String description;

	@NotNull
	private CategoryEnum categoryEnum;

	private List<String> tags;

	@NotNull
	private MultipartFile multipartFile;

}
