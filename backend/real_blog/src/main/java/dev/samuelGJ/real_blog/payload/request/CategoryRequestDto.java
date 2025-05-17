package dev.samuelGJ.real_blog.payload.request;

import jakarta.validation.constraints.NotBlank;

public record CategoryRequestDto(@NotBlank String name) {
}
