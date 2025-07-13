package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.security.UserPrincipal;

import dev.samuelGJ.real_blog.payload.request.CertificationRequestDto;
import dev.samuelGJ.real_blog.payload.request.CertificationUpdateRequest;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.CertificationResponseDto;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;

public interface CertificationService {

    CertificationResponseDto save(UserPrincipal currentUser, CertificationRequestDto dto);

    CertificationResponseDto update(UserPrincipal currentUser, Long id, CertificationUpdateRequest dto);

    CertificationResponseDto get(UserPrincipal currentUser, Long id);

    PagedResponse<CertificationResponseDto> getAll( int page, int size);

    ApiResponse delete(UserPrincipal currentUser, Long id);
    
}
