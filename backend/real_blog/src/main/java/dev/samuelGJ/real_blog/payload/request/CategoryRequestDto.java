package dev.samuelGJ.real_blog.payload.request;

import dev.samuelGJ.real_blog.enums.CategoryEnum;
import jakarta.validation.constraints.NotNull;

public record CategoryRequestDto(@NotNull CategoryEnum categoryEnum) {
}
