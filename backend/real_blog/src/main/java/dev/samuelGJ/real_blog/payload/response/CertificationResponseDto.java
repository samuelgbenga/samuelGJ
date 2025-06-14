package dev.samuelGJ.real_blog.payload.response;

import dev.samuelGJ.real_blog.payload.UserSummary;
import java.time.LocalDate;
import java.time.Instant;

public record CertificationResponseDto(
    Long id,
    String name,
    String issuer,
    String description,
    LocalDate issueDate,
    LocalDate expiryDate,
    String credentialUrl,
    UserSummary user,
    Instant createdAt,
    Instant updatedAt
) {}
