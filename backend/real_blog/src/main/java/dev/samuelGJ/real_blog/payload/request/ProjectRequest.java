package dev.samuelGJ.real_blog.payload.request;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotBlank;

public record ProjectRequest(

    @NotBlank
    String name,
    @NotBlank
    String language,
    List<String> frameworks,
    @NotBlank
    String url,
    @NotBlank
    String description
) {
    public ProjectRequest {
        if (frameworks == null) {
            frameworks = new ArrayList<>();
        }
    }
}
