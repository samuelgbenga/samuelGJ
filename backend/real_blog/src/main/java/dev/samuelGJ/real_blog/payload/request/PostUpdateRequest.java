package dev.samuelGJ.real_blog.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import dev.samuelGJ.real_blog.enums.CategoryEnum;
import dev.samuelGJ.real_blog.enums.PostStatus;

@Data
public class PostUpdateRequest {


	private String title;


	private String body;

	private String description;

	private CategoryEnum categoryEnum;

	private PostStatus postStatus;

	private List<String> tags;

}
