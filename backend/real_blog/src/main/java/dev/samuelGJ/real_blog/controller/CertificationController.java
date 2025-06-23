package dev.samuelGJ.real_blog.controller;

import dev.samuelGJ.real_blog.payload.request.CertificationRequestDto;
import dev.samuelGJ.real_blog.payload.request.CertificationUpdateRequest;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.CertificationResponseDto;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.security.CurrentUser;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.CertificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/certifications")
@RequiredArgsConstructor
public class CertificationController {

    private final CertificationService certificationService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CertificationResponseDto> create(
            @Valid @ModelAttribute CertificationRequestDto request,
            @CurrentUser UserPrincipal currentUser) {
        CertificationResponseDto certification = certificationService.save(currentUser, request);
        return new ResponseEntity<>(certification, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificationResponseDto> get(
            @PathVariable(value = "id") Long id,
            @CurrentUser UserPrincipal currentUser) {
        CertificationResponseDto certification = certificationService.get(currentUser, id);
        return new ResponseEntity<>(certification, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<PagedResponse<CertificationResponseDto>> getAll(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PagedResponse<CertificationResponseDto> certifications = certificationService.getAll(currentUser, page, size);
        return new ResponseEntity<>(certifications, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CertificationResponseDto> update(
            @PathVariable(value = "id") Long id,
            @Valid @RequestBody CertificationUpdateRequest request,
            @CurrentUser UserPrincipal currentUser) {
        CertificationResponseDto certification = certificationService.update(currentUser, id, request);
        return new ResponseEntity<>(certification, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> delete(
            @PathVariable(value = "id") Long id,
            @CurrentUser UserPrincipal currentUser) {
        ApiResponse response = certificationService.delete(currentUser, id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
} 