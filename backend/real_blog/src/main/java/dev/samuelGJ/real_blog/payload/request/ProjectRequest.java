package dev.samuelGJ.real_blog.payload.request;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
    String description,

    List<MultipartFile> multipartFiles
) {
    public ProjectRequest {
        if (frameworks == null) {
            frameworks = new ArrayList<>();
        }
        if (multipartFiles == null){
            multipartFiles = new ArrayList<>();
        }
    }
}

    
