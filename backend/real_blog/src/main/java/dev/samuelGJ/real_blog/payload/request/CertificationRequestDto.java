package dev.samuelGJ.real_blog.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;

public record CertificationRequestDto(
    @NotBlank
    String name,
    
    @NotBlank
    String issuer,
    
    @NotBlank
    String description,
    
    @NotNull
    LocalDate issueDate,
    
    LocalDate expireDate,
    
    @NotNull
    MultipartFile multipartFile
) {}
