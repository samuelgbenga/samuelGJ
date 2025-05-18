package dev.samuelGJ.real_blog.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public record PhotoRequest (	@NotBlank
								String url,

										@NotBlank
									 String thumbnailUrl){

}

